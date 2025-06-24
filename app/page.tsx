'use client'

import { useRouter } from 'next/navigation'

export default function Accueil() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-4xl font-extrabold text-center mb-10">Bienvenue sur <span className="text-blue-700">Scrumy</span> 🎯</h1>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <button
          onClick={() => router.push('/creer')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow"
        >
          ➕ Créer un projet
        </button>

        <button
          onClick={() => router.push('/rejoindre')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded shadow"
        >
          👥 Rejoindre un projet
        </button>
      </div>
    </div>
  )
}
