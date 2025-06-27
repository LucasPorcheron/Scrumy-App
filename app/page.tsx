'use client' 

import { useRouter } from 'next/navigation' 

export default function Accueil() {
  const router = useRouter()

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
      {/* Titre de la page d'accueil */}
      <h1 className="text-3xl font-extrabold mb-6">
        Bienvenue sur <span className="text-blue-700">Scrumy</span> 🎯
      </h1>

      {/* Conteneur des deux boutons */}
      <div className="flex flex-col gap-4">
        {/* Bouton pour aller à la page de création de projet */}
        <button
          onClick={() => router.push('/creer')} // Redirection vers /creer
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
        >
          ➕ Créer un projet
        </button>

        {/* Bouton pour aller à la page de rejoindre un projet */}
        <button
          onClick={() => router.push('/rejoindre')} // Redirection vers /rejoindre
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
        >
          👥 Rejoindre un projet
        </button>
      </div>
    </div>
  )
}
