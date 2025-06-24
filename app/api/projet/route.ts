import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'

export async function POST(req: Request) {
  const body = await req.json()
  const { nom, pseudo } = body

  if (!nom || !pseudo) {
    return new Response(JSON.stringify({ erreur: 'Nom et pseudo requis' }), { status: 400 })
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

  try {
    const projet = await prisma.projet.create({
      data: {
        nom,
        code,
      },
    })

    await prisma.participant.create({
      data: {
        pseudo,
        projetId: projet.id,
        roles: [Role.CP], // enum utilisé ici
      },
    })

    return new Response(JSON.stringify(projet), { status: 201 })
  } catch (error) {
    console.error('Erreur création projet:', error)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur lors de la création' }), { status: 500 })
  }
}
