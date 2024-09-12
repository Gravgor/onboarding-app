import Link from 'next/link'
import { MountainIcon, Users2Icon, FileTextIcon, BarChartIcon, SettingsIcon } from 'lucide-react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Providers } from '@/components/Providers'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }

  const isHR = session.user?.role === 'hr'

  return (
    <div className="flex h-screen bg-gray-100">
      <Providers>
      <main className="flex-1 overflow-y-auto">
        <header className="">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <Navigation isHR={true} />
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      </Providers>
    </div>
  )
}