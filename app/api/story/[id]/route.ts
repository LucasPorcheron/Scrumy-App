import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// ✅ Pour DELETE
export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params

  if (!id) {
    return new Response(JSON.stringify({ erreur: 'ID requis' }), { status: 400 })
  }

  try {
    await prisma.story.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}

// ✅ Pour PATCH
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params
  const body = await req.json()
  const { terminee } = body

  if (typeof terminee !== 'boolean') {
    return new Response(JSON.stringify({ erreur: '"terminee" invalide' }), { status: 400 })
  }

  try {
    const updated = await prisma.story.update({
      where: { id },
      data: { terminee },
    })

    return new Response(JSON.stringify(updated), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
