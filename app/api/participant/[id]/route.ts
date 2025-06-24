import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH : modifier les rôles et banni
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()

  const updated = await prisma.participant.update({
    where: { id },
    data: {
      roles: body.roles,
      banni: body.banni,
    },
  })

  return NextResponse.json(updated)
}

// DELETE : supprimer un participant
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  await prisma.participant.delete({
    where: { id },
  })

  return NextResponse.json({ success: true }, { status: 204 })
}
