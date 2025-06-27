'use client'

// Import des dépendances nécessaires
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

// Définition des rôles possibles dans le projet
type Role = 'CP' | 'PO' | 'SM' | 'DEV'

// Composant principal pour afficher un projet
export default function ProjetPage() {
  // Récupération du code du projet depuis l'URL
  const { code } = useParams()
  // États pour gérer les données du projet
  const [projet, setProjet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState('')
  // État pour la création d'une nouvelle story
  const [nouvelleStory, setNouvelleStory] = useState({
    titre: '',
    description: '',
    effort: 1,
    priorite: 'MUST',
  })
  // État pour le pseudo de l'utilisateur
  const [pseudo, setPseudo] = useState<string | null>(null)

  // Hook pour charger le pseudo depuis le localStorage
  useEffect(() => {
    setPseudo(localStorage.getItem('pseudo'))
  }, [])

  // Hook pour charger les données du projet
  useEffect(() => {
    if (!code) return

    // Fonction asynchrone pour charger les données du projet
    async function fetchProjet() {
      try {
        // Appel à l'API pour récupérer les données du projet
        const res = await fetch(`/api/projet/${code}`)
        if (!res.ok) throw new Error('Projet non trouvé')
        const data = await res.json()
        // Mise à jour de l'état avec les données du projet
        setProjet(data)
      } catch (err) {
        // Gestion des erreurs
        console.error('Erreur lors du chargement du projet :', err)
        setErreur('Erreur lors du chargement du projet')
      } finally {
        // Fin du chargement
        setLoading(false)
      }
    }

    fetchProjet()
  }, [code])

  // Fonction pour supprimer un participant du projet
  const supprimerParticipant = async (id: string) => {
    await fetch(`/api/participant/${id}`, {
      method: 'DELETE',
    })
    setProjet((prev: any) => ({
      ...prev,
      participants: prev.participants.filter((p: any) => p.id !== id),
    }))
  }

  const ajouterStory = async () => {
    if (!nouvelleStory.titre || !nouvelleStory.description) return
  
    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nouvelleStory, projetId: projet.id }),
      })
  
      if (!res.ok) throw new Error('Erreur ajout story')
  
      const nouvelle = await res.json()
      setProjet((prev: any) => ({
        ...prev,
        stories: [...(prev.stories || []), nouvelle],
      }))
  
      setNouvelleStory({ titre: '', description: '', effort: 1, priorite: 'MUST' })
    } catch (err) {
      console.error(err)
      setErreur("Erreur lors de l'ajout de la story")
    }
  }
  const toggleTerminee = async (id: string, actuel: boolean) => {
    try {
      const res = await fetch(`/api/story/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ terminee: !actuel }),
      })
  
      if (!res.ok) throw new Error()
  
      setProjet((prev: any) => ({
        ...prev,
        stories: prev.stories.map((s: any) =>
          s.id === id ? { ...s, terminee: !actuel } : s
        ),
      }))
    } catch (err) {
      console.error('Erreur toggle terminee', err)
    }
  }
  
  const supprimerStory = async (id: string) => {
    try {
      await fetch(`/api/story/${id}`, {
        method: 'DELETE',
      })
      setProjet((prev: any) => ({
        ...prev,
        stories: prev.stories.filter((s: any) => s.id !== id),
      }))
    } catch (err) {
      console.error('Erreur suppression story', err)
    }
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
<h2 className="text-lg font-semibold mt-8">📚 Stories :</h2>
<ul className="list-disc list-inside mb-6">
  {projet.stories?.length > 0 ? (
    projet.stories.map((s: any) => (
      <li key={s.id} className="flex justify-between items-start gap-2">
  <div className={`flex-1 ${s.terminee ? 'opacity-60 line-through' : ''}`}>
    <strong>{s.titre}</strong> ({s.effort} pts, {s.priorite})
    <p className="text-sm text-gray-600">{s.description}</p>
  </div>

  <div className="flex flex-col items-end gap-1">
    {estCP && (
      <>
        <label className="text-sm">
          <input
            type="checkbox"
            checked={s.terminee}
            onChange={() => toggleTerminee(s.id, s.terminee)}
            className="mr-1"
          />
          Terminée
        </label>
        <button
          onClick={() => supprimerStory(s.id)}
          className="text-red-600 hover:underline text-sm"
        >
          🗑️
        </button>
      </>
    )}
  </div>
</li>


    ))
  ) : (
    <li>Aucune story pour le moment</li>
  )}
</ul>

{estCP && (
  <div className="border-t pt-4 mt-6">
    <h3 className="text-md font-semibold mb-2">➕ Ajouter une Story</h3>
    <input
      placeholder="Titre"
      className="border p-2 block w-full mb-2 rounded"
      value={nouvelleStory.titre}
      onChange={(e) => setNouvelleStory({ ...nouvelleStory, titre: e.target.value })}
    />
    <textarea
      placeholder="Description"
      className="border p-2 block w-full mb-2 rounded"
      value={nouvelleStory.description}
      onChange={(e) => setNouvelleStory({ ...nouvelleStory, description: e.target.value })}
    />
    <input
      type="number"
      placeholder="Effort"
      className="border p-2 block w-full mb-2 rounded"
      value={nouvelleStory.effort}
      onChange={(e) => setNouvelleStory({ ...nouvelleStory, effort: parseInt(e.target.value) })}
    />
    <select
      className="border p-2 block w-full mb-4 rounded"
      value={nouvelleStory.priorite}
      onChange={(e) => setNouvelleStory({ ...nouvelleStory, priorite: e.target.value })}
    >
      <option value="MUST">MUST</option>
      <option value="SHOULD">SHOULD</option>
      <option value="COULD">COULD</option>
      <option value="WOULD">WOULD</option>
    </select>
    <button
      onClick={ajouterStory}
      className="bg-purple-600 text-white px-4 py-2 rounded w-full"
    >
      Ajouter la Story
    </button>
  </div>
)}

      
    </div>
  )
}
