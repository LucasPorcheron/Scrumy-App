import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { code: string } }) {
  try {
    const projet = await prisma.projet.findUnique({
      where: { code: params.code },
      include: {
        sprints: true,
        participants: true,
      },
    })

    if (!projet) {
      return new Response(JSON.stringify({ erreur: 'Projet non trouvé' }), { status: 404 })
    }

    return new Response(JSON.stringify(projet), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
