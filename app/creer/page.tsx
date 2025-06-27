'use client'

// Import des dépendances nécessaires
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Composant principal pour créer un nouveau projet
export default function CreerProjet() {
  // États pour gérer les inputs et les erreurs
  const [nom, setNom] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [erreur, setErreur] = useState('')
  const router = useRouter()

  // Fonction pour créer un projet
  async function creerProjet() {
    setErreur('')
    try {
      const res = await fetch('/api/projet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, pseudo }),
      })

      if (!res.ok) {
        const err = await res.json()
        setErreur(err.erreur || 'Erreur inconnue')
        return
      }

      // Récupération des données du projet
      const projet = await res.json()
      // Sauvegarde du pseudo dans le localStorage
      localStorage.setItem('pseudo', pseudo)
      // Redirection vers la page du projet
      router.push(`/projet/${projet.code}`)
    } catch {
      setErreur('Erreur lors de la création du projet')
    }
  }

  // Interface utilisateur du formulaire de création
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">Créer un projet</h1>

      <input
        placeholder="Nom du projet"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="border p-2 block w-full mb-4 rounded"
      />

      <input
        placeholder="Ton pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        className="border p-2 block w-full mb-4 rounded"
      />

      <button
        onClick={creerProjet}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        ➕ Créer
      </button>

      {erreur && <p className="text-red-500 mt-4">{erreur}</p>}
    </div>
  )
}
