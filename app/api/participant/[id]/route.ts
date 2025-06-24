import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 🔁 PATCH pour modifier les rôles et banni
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { roles, banni } = await req.json()
  const id = context.params.id

  const updated = await prisma.participant.update({
    where: { id },
    data: { roles, banni },
  })

  return NextResponse.json(updated)
}

// ❌ DELETE pour supprimer un participant
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id

  try {
    await prisma.participant.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Participant supprimé' }, { status: 204 })
  } catch (error) {
    return NextResponse.json({ erreur: 'Erreur lors de la suppression' }, { status: 500 })
  }
}
