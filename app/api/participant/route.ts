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

  const nouveau = await prisma.participant.create({
    data: {
      pseudo,
      projetId: projet.id,
      roles: ['DEV'], // par défaut
    },
  })

  return new Response(JSON.stringify({ ...nouveau, projetCode: code }), { status: 201 })
}
