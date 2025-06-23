import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    const code = pathname.split('/').pop() as string

    const projet = await prisma.projet.findUnique({
      where: { code },
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
