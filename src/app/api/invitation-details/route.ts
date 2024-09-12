import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 })
  }

  const invitation = await prisma.invitation.findUnique({
    where: { id: token },
    include: { company: true },
  })

  if (!invitation) {
    return NextResponse.json({ error: 'Invalid invitation' }, { status: 404 })
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invitation has expired' }, { status: 410 })
  }

  return NextResponse.json({
    email: invitation.email,
    company: invitation.company.name,
    role: invitation.role,
  })
}