import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function DELETE(req: NextRequest, { params }: any) {
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
export async function PATCH(req: Request, { params }: any) {
    const id = params.id
    const body = await req.json()
  
    try {
      const story = await prisma.story.update({
        where: { id },
        data: {
          terminee: body.terminee,
        },
      })
      return new Response(JSON.stringify(story), { status: 200 })
    } catch (err) {
      console.error(err)
      return new Response(JSON.stringify({ erreur: 'Erreur lors de la mise à jour' }), { status: 500 })
    }
  }
  