'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function acceptInvitation(
  token: string,
  data: { name: string; password: string }
): Promise<{ success: boolean; message: string }> {
  const invitation = await prisma.invitation.findUnique({
    where: { id: token },
    include: { company: true },
  })

  if (!invitation) {
    return { success: false, message: 'Invalid invitation token.' }
  }

  if (invitation.expiresAt < new Date()) {
    return { success: false, message: 'This invitation has expired.' }
  }

  const password = data.password
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.$transaction(async (prisma) => {
      // Create the user
      const user = await prisma.user.create({
        data: {
          email: invitation.email,
          password: hashedPassword,
          name: data.name,
          role: invitation.role,
          companyId: invitation.companyId,
        },
      })

      // Delete the invitation
      await prisma.invitation.delete({
        where: { id: invitation.id },
      })
    })

    return { success: true, message: 'Account created successfully!' }
  } catch (error) {
    console.error('Error creating account:', error)
    return { success: false, message: 'An error occurred while creating your account.' }
  }
}