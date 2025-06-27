import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id

  try {
    await prisma.story.delete({
      where: { id },
    })
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
