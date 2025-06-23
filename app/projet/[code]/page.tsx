'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function ProjetPage() {
  const { code } = useParams()
  const [projet, setProjet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    if (!code) return

    async function fetchProjet() {
      try {
        const res = await fetch(`/api/projet/${code}`)
        if (!res.ok) throw new Error('Projet non trouvé')
        const data = await res.json()
        setProjet(data)
      } catch (err) {
        console.error(err)
        setErreur('Erreur lors du chargement du projet')
      } finally {
        setLoading(false)
      }
    }

    fetchProjet()
  }, [code])

  if (loading) return <p>Chargement...</p>
  if (erreur) return <p className="text-red-500">{erreur}</p>
  if (!projet) return <p>Projet introuvable.</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Projet : {projet.nom}</h1>
      <p className="mb-6">Code de partage : <strong>{projet.code}</strong></p>

      <h2 className="text-lg font-semibold mt-4">Participants :</h2>
      <ul className="list-disc list-inside mb-4">
        {projet.participants.length > 0 ? (
          projet.participants.map((p: any) => (
            <li key={p.id}>
              {p.pseudo} ({p.roles.join(', ')})
            </li>
          ))
        ) : (
          <li>Aucun participant</li>
        )}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Sprints :</h2>
      <ul className="list-disc list-inside">
        {projet.sprints.length > 0 ? (
          projet.sprints.map((s: any) => (
            <li key={s.id}>
              {s.titre} — du {new Date(s.debut).toLocaleDateString()} au {new Date(s.fin).toLocaleDateString()}
            </li>
          ))
        ) : (
          <li>Aucun sprint pour le moment</li>
        )}
      </ul>
    </div>
  )
}
