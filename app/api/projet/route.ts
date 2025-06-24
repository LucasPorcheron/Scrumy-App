import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const { nom, pseudo } = body

  if (!nom || !pseudo) {
    return new Response(JSON.stringify({ erreur: 'Nom et pseudo requis' }), { status: 400 })
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

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
      roles: ['CP'], // ou 'PO' selon ce que tu veux
    },
  })

  return new Response(JSON.stringify(projet), { status: 201 })
}
