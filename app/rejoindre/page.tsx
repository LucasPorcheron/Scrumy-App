'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RejoindrePage() {
  const [code, setCode] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [erreur, setErreur] = useState('')
  const router = useRouter()

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

      const participant = await res.json()
      router.push(`/projet/${participant.projetCode}`)
    } catch (err) {
      console.error(err)
      setErreur("Erreur lors de l'ajout")
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Rejoindre un projet</h1>
      <input
        placeholder="Code du projet"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 block w-full mb-4"
      />
      <input
        placeholder="Ton pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        className="border p-2 block w-full mb-4"
      />
      <button
        onClick={rejoindreProjet}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Rejoindre
      </button>
      {erreur && <p className="text-red-500 mt-4">{erreur}</p>}
    </div>
  )
}
