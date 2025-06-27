import { NextRequest } from 'next/server'

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return new Response(`Suppression simulée pour id: ${context.params.id}`, { status: 200 })
}
