import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'


// ✅ DELETE une story
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  if (!id) {
    return new Response(JSON.stringify({ erreur: 'ID requis' }), { status: 400 })
  }

  try {
    await prisma.story.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
  }
}

// ✅ Valider une story
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const id = params.id
    const body = await request.json()
  
    try {
      const updated = await prisma.story.update({
        where: { id },
        data: { terminee: body.terminee },
      })
  
      return new Response(JSON.stringify(updated), { status: 200 })
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify({ erreur: 'Erreur serveur' }), { status: 500 })
    }
  }
  
