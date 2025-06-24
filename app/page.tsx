'use client'

import { useRouter } from 'next/navigation'

export default function Accueil() {
  const router = useRouter()

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
      <h1 className="text-3xl font-extrabold mb-6">Bienvenue sur <span className="text-blue-700">Scrumy</span> 🎯</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push('/creer')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
        >
          ➕ Créer un projet
        </button>

        <button
          onClick={() => router.push('/rejoindre')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
        >
          👥 Rejoindre un projet
        </button>
      </div>
    </div>
  )
}
