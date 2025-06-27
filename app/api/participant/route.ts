// Import de la base de données
import { prisma } from '@/lib/prisma'

// Route POST pour créer ou récupérer un participant
export async function POST(req: Request) {
  // Extraction des données du corps de la requête
  const body = await req.json()
  const { code, pseudo } = body

  // Vérification des données requises
  if (!code || !pseudo) {
    return new Response(JSON.stringify({ erreur: 'Code et pseudo requis' }), { status: 400 })
  }

  // Recherche du projet correspondant au code
  const projet = await prisma.projet.findUnique({ where: { code } })
  if (!projet) {
    return new Response(JSON.stringify({ erreur: 'Projet introuvable' }), { status: 404 })
  }

  try {
    // Vérifie si le participant existe déjà dans ce projet
    let participant = await prisma.participant.findFirst({
      where: {
        pseudo,
        projetId: projet.id,
      },
    })

    // S'il n'existe pas, on le crée avec les rôles par défaut
    if (!participant) {
      participant = await prisma.participant.create({
        data: {
          pseudo,               
          projetId: projet.id,  
          roles: ['DEV'],       
        },
      })
    }

    // Retourne les informations du participant avec le code du projet
    return new Response(JSON.stringify({ ...participant, projetCode: code }), { status: 200 })
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la création du participant :', error)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
