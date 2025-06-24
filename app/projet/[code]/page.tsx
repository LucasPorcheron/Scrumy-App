'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Role = 'CP' | 'PO' | 'SM' | 'DEV'

export default function ProjetPage() {
  const { code } = useParams()
  const [projet, setProjet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState('')
  const [pseudo, setPseudo] = useState<string | null>(null)

  useEffect(() => {
    setPseudo(localStorage.getItem('pseudo'))
  }, [])

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

  const moi = projet?.participants.find((p: any) => p.pseudo === pseudo)
  const estCP = moi?.roles.includes('CP')

  const toggleRole = (participantId: string, role: Role) => {
    setProjet((prev: any) => ({
      ...prev,
      participants: prev.participants.map((p: any) =>
        p.id === participantId
          ? {
              ...p,
              roles: p.roles.includes(role)
                ? p.roles.filter((r: string) => r !== role)
                : [...p.roles, role],
            }
          : p
      ),
    }))
  }

  const toggleBanni = (participantId: string) => {
    setProjet((prev: any) => ({
      ...prev,
      participants: prev.participants.map((p: any) =>
        p.id === participantId ? { ...p, banni: !p.banni } : p
      ),
    }))
  }

  const saveRoles = async (participant: any) => {
    await fetch(`/api/participant/${participant.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roles: participant.roles, banni: participant.banni }),
    })
  }

  const supprimerParticipant = async (id: string) => {
    await fetch(`/api/participant/${id}`, {
      method: 'DELETE',
    })
    setProjet((prev: any) => ({
      ...prev,
      participants: prev.participants.filter((p: any) => p.id !== id),
    }))
  }

  if (loading) return <p>Chargement...</p>
  if (erreur) return <p className="text-red-500">{erreur}</p>
  if (!projet) return <p>Projet introuvable.</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Projet : {projet.nom}</h1>
      <p className="mb-6">Code de partage : <strong>{projet.code}</strong></p>

      <h2 className="text-lg font-semibold mt-4">Participants :</h2>
      {projet.participants.length > 0 ? (
        <ul className="space-y-3 mb-4">
          {projet.participants.map((p: any) => (
            <li key={p.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2 items-center">
                <span className="font-semibold">{p.pseudo}</span>
                {p.pseudo === pseudo && <span className="text-xs bg-green-200 px-2 py-0.5 rounded">Moi</span>}
                {p.banni && <span className="text-xs bg-red-300 px-2 py-0.5 rounded">Banni</span>}
              </div>

              {estCP ? (
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                  {(['CP', 'PO', 'SM', 'DEV'] as Role[]).map((role) => (
                    <label key={role} className="text-sm">
                      <input
                        type="checkbox"
                        checked={p.roles.includes(role)}
                        onChange={() => toggleRole(p.id, role)}
                        className="mr-1"
                      />
                      {role}
                    </label>
                  ))}
                  <label className="text-sm">
                    <input
                      type="checkbox"
                      checked={p.banni}
                      onChange={() => toggleBanni(p.id)}
                      className="mr-1"
                    />
                    Banni
                  </label>
                  <button
                    onClick={() => saveRoles(p)}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                  >
                    💾
                  </button>
                  {p.pseudo !== pseudo && (
                    <button
                      onClick={() => supprimerParticipant(p.id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-sm text-gray-600">{p.roles.join(', ')}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun participant</p>
      )}

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
