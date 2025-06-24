import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const { code, pseudo } = body

  if (!code || !pseudo) {
    return new Response(JSON.stringify({ erreur: 'Code et pseudo requis' }), { status: 400 })
  }

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

    // S'il n'existe pas, on le crée
    if (!participant) {
      participant = await prisma.participant.create({
        data: {
          pseudo,
          projetId: projet.id,
          roles: ['DEV'], // rôle par défaut
        },
      })
    }

    return new Response(JSON.stringify({ ...participant, projetCode: code }), { status: 200 })
  } catch (error) {
    console.error('Erreur rejoindre projet :', error)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
