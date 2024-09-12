import { revalidatePath } from 'next/cache'
import { prisma } from "../prisma"



export async function getOnboardings(companyId: string) {
    return await prisma.onboarding.findMany({
      where: {
        user: {
          companyId
        }
      },
      include: { user: true }
    })
  }

export async function getOnboardingDetails(id: string, companyId: string) {
    return await prisma.onboarding.findFirst({
      where: { 
        id,
        user: {
          companyId
        }
      },
      include: {
        user: true,
        tasks: true,
        documents: true,
        complianceItems: true
      }
    })
  }

export async function createOnboarding(userId: string, companyId: string, startDate: Date) {
  const onboarding = await prisma.onboarding.create({
    data: {
      user: {
        connect: { id: userId }
      },
      company: {
        connect: { id: companyId }
      },
      startDate,
      tasks: {
        create: [
          { title: "Complete personal information form", priority: "High" },
          { title: "Sign employee handbook", priority: "Medium" },
          { title: "Set up direct deposit", priority: "High" },
          { title: "Complete I-9 form", priority: "Medium" },
          { title: "Attend orientation session", priority: "Low" },
        ]
      },
      documents: {
        create: [
          { title: "Employee Handbook", status: "Pending", dueDate: new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) },
          { title: "Non-Disclosure Agreement", status: "Pending", dueDate: new Date(startDate.getTime() + 10 * 24 * 60 * 60 * 1000) },
          { title: "Benefits Enrollment Form", status: "Pending", dueDate: new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000) },
          { title: "Emergency Contact Information", status: "Pending", dueDate: new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000) },
        ]
      },
      complianceItems: {
        create: [
          { name: "Personal Information", progress: 0 },
          { name: "Legal Documents", progress: 0 },
          { name: "Training Modules", progress: 0 },
          { name: "Policy Acknowledgements", progress: 0 },
        ]
      }
    }
  })
  revalidatePath('/dashboard/hr/onboardings')
  return onboarding
}


export async function updateTaskStatus(taskId: string, completed: boolean) {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { completed }
  })
  revalidatePath('/dashboard/tasks')
  return task
}

export async function updateDocumentStatus(documentId: string, status: string) {
  const document = await prisma.document.update({
    where: { id: documentId },
    data: { status }
  })
  revalidatePath('/dashboard/documents')
  return document
}

export async function updateComplianceProgress(itemId: string, progress: number) {
  const item = await prisma.complianceItem.update({
    where: { id: itemId },
    data: { progress }
  })
  revalidatePath('/dashboard/compliance')
  return item
}

export async function getOnboardingTemplates(companyId: string) {
  return await prisma.onboardingTemplate.findMany({
    where: { companyId },
    include: {
      tasks: true,
      documents: true,
      complianceItems: true
    }
  });
}


export async function createOnboardingTemplate(data: {
  name: string;
  description: string;
  tasks: { title: string; category: string }[];
  documents: { title: string; required: boolean }[];
  complianceItems: { title: string; type: string }[];
  companyId: string;
}) {
  try {
    const newTemplate = await prisma.onboardingTemplate.create({
      data: {
        name: data.name,
        description: data.description,
        company: { connect: { id: data.companyId } },
        tasks: {
          create: data.tasks.map(task => ({
            title: task.title,
            category: task.category,
            priority: 'medium', // Adding a default priority
          })),
        },
        documents: {
          create: data.documents.map(doc => ({
            title: doc.title,
            required: doc.required,
          })),
        },
        complianceItems: {
          create: data.complianceItems.map(item => ({
            name: item.title,  // Changed 'title' to 'name'
            type: item.type,
          })),
        },
      },
      include: {
        tasks: true,
        documents: true,
        complianceItems: true,
      },
    });
    revalidatePath('/dashboard/onboarding-management')
    return newTemplate;
  } catch (error) {
    console.error("Error creating onboarding template:", error);
    throw error;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateOnboardingTemplate(id: string, data: any) {
  const template = await prisma.onboardingTemplate.update({
    where: { id },
    data
  })
  revalidatePath('/dashboard/hr/onboarding-management')
  return template
}

export async function updateTask(taskId: string, data: { completed?: boolean, priority?: string }) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data
    })
    revalidatePath('/dashboard/hr/onboardings/[id]')
    return task
  }