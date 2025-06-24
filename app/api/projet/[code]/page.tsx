import { prisma } from '@/lib/prisma'
import ParticipantsList from '@/app/api/projet/[code]/ParticipantsList'

interface Props {
  params: { code: string }
}

export default async function Page({ params }: Props) {
  const projet = await prisma.projet.findUnique({
    where: { code: params.code },
    include: {
      participants: true,
    },
  })

  if (!projet) {
    return <div className="p-4 text-red-500">Projet introuvable</div>
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{projet.nom}</h1>
      <p className="mb-6 text-gray-600">Code : {projet.code}</p>

      <ParticipantsList projetId={projet.id} participants={projet.participants} />
    </main>
  )
}
