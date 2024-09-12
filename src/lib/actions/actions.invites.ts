'use server'
export async function inviteEmployee(email: string, role: string, companyId: string) {
    const invitationToken = Math.random().toString(36).substring(2, 15);
  
    const invitation = await prisma?.invitation.create({
      data: {
        id: invitationToken,
        email,
        role,
        companyId,
        token: invitationToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
      },
    });
  
    //await sendInvitationEmail(email, invitationToken);
  
    return invitation;
  }