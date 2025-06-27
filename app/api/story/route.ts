// Import des dépendances nécessaires
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// Route POST pour créer une nouvelle story
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { titre, description, effort, priorite, projetId } = body

  // Vérification des champs requis
  if (!titre || !description || !effort || !priorite || !projetId) {
    return new Response(JSON.stringify({ erreur: 'Champs requis manquants' }), { status: 400 })
  }

  try {
    // Création de la story
    const story = await prisma.story.create({
      data: {
        titre,
        description,
        effort,
        priorite,
        projetId,
        resteAFaire: effort,
      },
    })

    // Retourne la story créée
    return new Response(JSON.stringify(story), { status: 201 })
  } catch (err) {
    // Gestion des erreurs
    console.error('Erreur lors de la création de la story :', err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
