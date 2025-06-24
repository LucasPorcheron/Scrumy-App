import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, context: any) {
  const id = context.params.id
  const body = await req.json()

  const updated = await prisma.participant.update({
    where: { id },
    data: {
      roles: body.roles,
      banni: body.banni,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, context: any) {
  const id = context.params.id

  await prisma.participant.delete({
    where: { id },
  })

  return NextResponse.json({ success: true }, { status: 204 })
}
