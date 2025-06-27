import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// ✅ CORRECT : DELETE avec "context" pour accéder aux params
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id

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

// ✅ PATCH aussi (optionnel ici)
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id
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
