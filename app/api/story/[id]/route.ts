import { prisma } from '@/lib/prisma'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ erreur: 'ID requis' }), { status: 400 })
  }

  try {
    await prisma.story.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ erreur: 'Erreur lors de la suppression' }), { status: 500 })
  }
}
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const body = await req.json()
    const { terminee } = body
  
    if (typeof terminee !== 'boolean') {
      return new Response(JSON.stringify({ erreur: 'Champ "terminee" manquant ou invalide' }), { status: 400 })
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
  