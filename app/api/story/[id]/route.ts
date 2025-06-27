import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// ✅ DELETE : supprimer une story
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.story.delete({
      where: { id: params.id },
    })
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}
