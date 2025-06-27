import { prisma } from '@/lib/prisma'
// Import des dépendances nécessaires
import { NextRequest } from 'next/server'

// Route DELETE pour supprimer une story
export async function DELETE(req: NextRequest, { params }: any) {
  try {
    // Suppression de la story 
    await prisma.story.delete({
      where: { id: params.id },
    })

    return new Response(null, { status: 204 })
  } catch (err) {
    // Gestion des erreurs
    console.error('Erreur lors de la suppression de la story :', err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}

// Route PATCH pour mettre à jour une story
export async function PATCH(req: Request, { params }: any) {
    const id = params.id
    const body = await req.json()
  
    try {
      // Mise à jour de la story
      const story = await prisma.story.update({
        where: { id },
        data: {
          terminee: body.terminee,
        },
      })
      // Retourne la story 
      return new Response(JSON.stringify(story), { status: 200 })
    } catch (err) {
      // Gestion des erreurs
      console.error('Erreur lors de la mise à jour de la story :', err)
      return new Response(JSON.stringify({ erreur: 'Erreur lors de la mise à jour' }), { status: 500 })
    }
}
  