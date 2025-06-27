// Import des dépendances nécessaires
import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'

// Route POST pour créer un nouveau projet
export async function POST(req: Request) {
  const body = await req.json()
  const { nom, pseudo } = body

  // Vérification des données requises
  if (!nom || !pseudo) {
    return new Response(JSON.stringify({ erreur: 'Nom et pseudo requis' }), { status: 400 })
  }

  // Génération d'un code unique pour le projet
  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

  try {
    // Création du projet dans la base de données
    const projet = await prisma.projet.create({
      data: {
        nom,
        code,
      },
    })

    // Création du créateur comme participant avec le rôle de Chef de Projet
    await prisma.participant.create({
      data: {
        pseudo,
        projetId: projet.id,
        roles: [Role.CP],
      },
    })

    // Retourne les informations du projet
    return new Response(JSON.stringify(projet), { status: 201 })
  } catch (error) {
    // Gestion des erreurs lors de la création du projet
    console.error('Erreur lors de la création du projet :', error)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur lors de la création' }), { status: 500 })
  }
}
