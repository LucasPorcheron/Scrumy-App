'use client'

import { useEffect, useState } from 'react'

type Role = 'CP' | 'PO' | 'SM' | 'DEV'

interface Participant {
  id: string
  pseudo: string
  roles: Role[]
}

interface Props {
  projetId: string
  participants: Participant[]
}

export default function ParticipantsList({ projetId, participants }: Props) {
  const [moi, setMoi] = useState<string | null>(null)
  const [localState, setLocalState] = useState(participants)

  useEffect(() => {
    setMoi(localStorage.getItem('pseudo'))
  }, [])

  const moiEstCP = participants.find(p => p.pseudo === moi)?.roles.includes('CP')

  const toggleRole = (id: string, role: Role) => {
    setLocalState((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              roles: p.roles.includes(role)
                ? p.roles.filter((r) => r !== role)
                : [...p.roles, role],
            }
          : p
      )
    )
  }

  const save = async (participant: Participant) => {
    await fetch(`/api/participant/${participant.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roles: participant.roles }),
    })
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6 w-full max-w-xl">
      <h2 className="text-lg font-bold mb-4">Participants</h2>
      {localState.map((p) => (
        <div key={p.id} className="flex items-center justify-between mb-3">
          <span className="font-semibold">{p.pseudo}</span>

          {moiEstCP ? (
            <div className="flex gap-2 items-center">
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
                onClick={() => save(p)}
                className="ml-2 px-2 py-1 text-sm bg-blue-600 text-white rounded"
              >
                💾
              </button>
            </div>
          ) : (
            <span className="text-sm text-gray-600">{p.roles.join(', ')}</span>
          )}
        </div>
      ))}
    </div>
  )
}
