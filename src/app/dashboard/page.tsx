import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { HRDashboard } from "@/components/hr-dashboard"
import { UserDashboard } from "@/components/user-dashboard"
import { prisma } from "@/lib/prisma"


async function getUserData(userId: string) {
  try {
    const user = await prisma?.user.findUnique({
      where: { id: userId },
      include: {
        onboarding: {
          include: {
            tasks: true,
            documents: true
          }
        }
      }
    })

    if (!user || !user.onboarding) {
      throw new Error('User or onboarding data not found')
    }

    return {
      name: user.name,
      position: user.role,
      startDate: user.onboarding.startDate,
      onboardingProgress: user.onboarding.progress,
      tasksCompleted: user.onboarding.tasks.filter(task => task.completed).length,
      tasksTotal: user.onboarding.tasks.length,
      documentsCompleted: user.onboarding.documents.filter(doc => doc.status === 'Signed').length,
      documentsTotal: user.onboarding.documents.length
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return {
      name: 'Unknown User',
      position: 'Unknown',
      startDate: new Date(),
      onboardingProgress: 0,
      tasksCompleted: 0,
  }
}
}

async function getHRData(companyId: string) {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        onboardings: {
          where: { status: 'ACTIVE' },
          include: { user: true }
        }
      }
    })

    if (!company) {
      throw new Error('Company not found')
    }

    const completedOnboardings = await prisma.onboarding.count({
      where: {
        companyId: companyId,
        status: 'COMPLETED',
        endDate: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }
    })

    const averageCompletionTime = await prisma.onboarding.aggregate({
      where: {
        companyId: companyId,
        status: 'COMPLETED'
      },
      _avg: {
        durationInDays: true
      }
    })

    return {
      activeOnboardings: company.onboardings.length,
      completedThisMonth: completedOnboardings,
      averageCompletionTime: `${Math.round(averageCompletionTime._avg.durationInDays || 0)} days`,
      complianceRate: "98%", // This might need a more complex calculation
      companyName: company.name
    }
  } catch (error) {
    console.error('Error fetching HR data:', error)
    return {
      activeOnboardings: 0,
      completedThisMonth: 0,
      averageCompletionTime: "N/A",
      complianceRate: "N/A"
    }
  }
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
}

  const isHR = session.user.role === 'hr' || session.user.role === 'admin' || session.user.role === 'manager'
  const companyId = session.user.companyId
  
  if (isHR) {
    const hrData = await getHRData(session.user.companyId)
    return <HRDashboard data={hrData} companyName={hrData.companyName || ''} companyId={companyId}/>
  } else {
    const userData = await getUserData(session.user.id)
    return <UserDashboard 
      name={userData.name}
      position={userData.position}
      startDate={userData.startDate.toISOString()}
      onboardingProgress={userData.onboardingProgress}
      tasksCompleted={userData.tasksCompleted}
      tasksTotal={0}
      documentsCompleted={0}
      documentsTotal={0}
    />
  }
}

