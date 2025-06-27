'use client' 

import { useState } from 'react' 
import { useRouter } from 'next/navigation' 

export default function RejoindrePage() {
  const [code, setCode] = useState('') 
  const [pseudo, setPseudo] = useState('') 
  const [erreur, setErreur] = useState('') 
  const router = useRouter() 

  // Fonction appelée quand l’utilisateur clique sur "Rejoindre"
  async function rejoindreProjet() {
    setErreur('') 

    try {
      const res = await fetch('/api/participant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, pseudo }),
      })

      if (!res.ok) {
        const err = await res.json()
        setErreur(err.erreur || 'Erreur inconnue') 
        return
      }

      // Récupère le participant et le stocker
      const participant = await res.json()
      localStorage.setItem('pseudo', pseudo) 
      router.push(`/projet/${participant.projetCode}`) 
    } catch (err) {
      console.error(err)
      setErreur("Erreur lors de l'ajout") 
    }
  }

  // Formulaire de saisie
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">Rejoindre un projet</h1>

      {/* Champ pour saisir le code du projet */}
      <input
        placeholder="Code du projet"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 block w-full mb-4 rounded"
      />

      {/* Champ pour saisir le pseudo */}
      <input
        placeholder="Ton pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        className="border p-2 block w-full mb-4 rounded"
      />

      {/* Bouton pour envoyer le formulaire */}
      <button
        onClick={rejoindreProjet}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        👥 Rejoindre
      </button>

      {/* Affichage de l'erreur éventuelle */}
      {erreur && <p className="text-red-500 mt-4">{erreur}</p>}
    </div>
  )
}
