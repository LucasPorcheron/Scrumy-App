import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { titre, description, effort, priorite, projetId } = body

  if (!titre || !description || !effort || !priorite || !projetId) {
    return new Response(JSON.stringify({ erreur: 'Champs requis manquants' }), { status: 400 })
  }

  try {
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

    return new Response(JSON.stringify(story), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
