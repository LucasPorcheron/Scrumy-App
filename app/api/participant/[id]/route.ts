import { prisma } from '@/lib/prisma'

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    await prisma.participant.delete({
      where: { id: params.id },
    })
  
    return new Response(null, { status: 204 })
  }
  