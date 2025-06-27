// Import des dépendances nécessaires
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// Route GET pour récupérer les détails d'un projet
export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    const code = pathname.split('/').pop() as string

    // Recherche du projet 
    const projet = await prisma.projet.findUnique({
      where: { code },
      include: {
        sprints: true,
        participants: true,
        stories: true,
      },
    })
    
    // Si le projet n'existe pas
    if (!projet) {
      return new Response(JSON.stringify({ erreur: 'Projet non trouvé' }), { status: 404 })
    }

    // Retourne les informations du projet
    return new Response(JSON.stringify(projet), { status: 200 })
  } catch (err) {
    // Gestion des erreurs
    console.error('Erreur lors de la récupération du projet :', err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
