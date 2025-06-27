// Import des dépendances nécessaires
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Route PATCH pour mettre à jour un participant
export async function PATCH(req: NextRequest, context: any) {
  const id = context.params.id
  const body = await req.json()

  // Mise à jour du participant avec les nouveaux rôles et statut de bannissement
  const updated = await prisma.participant.update({
    where: { id },
    data: {
      roles: body.roles,      
      banni: body.banni,
    },
  })

  return NextResponse.json(updated)
}

// Route DELETE pour supprimer un participant
export async function DELETE(req: NextRequest, context: any) {
  // Récupération de l'ID du participant à supprimer
  const id = context.params.id

  // Suppression du participant de la base de données
  await prisma.participant.delete({
    where: { id },
  })

  return NextResponse.json({ success: true }, { status: 204 })
}
