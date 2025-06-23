import { prisma } from '@/lib/prisma'

function genererCodeProjet(): string {
  const lettres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from({ length: 6 }, () =>
    lettres.charAt(Math.floor(Math.random() * lettres.length))
  ).join('')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nom } = body

    if (!nom || nom.trim() === '') {
      return new Response(JSON.stringify({ erreur: 'Nom de projet requis' }), { status: 400 })
    }

    const projet = await prisma.projet.create({
      data: {
        nom,
        code: genererCodeProjet(),
      },
    })

    return new Response(JSON.stringify(projet), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
