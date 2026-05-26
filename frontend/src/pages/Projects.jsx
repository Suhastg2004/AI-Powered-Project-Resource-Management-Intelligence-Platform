import React, { useState } from 'react'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { projects } from '../data/projects'

export default function Projects() {
  const [query, setQuery] = useState('')
  const filtered = projects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-3xl font-semibold" style={{ color: 'var(--text)' }}>Projects</h3>
          <p className="mt-1" style={{ color: 'var(--muted)' }}>Manage active workflows, owners, and progress tracking.</p>
        </div>
        <div className="w-full max-w-sm">
          <input
            placeholder="Search projects..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full rounded-3xl px-4 py-3 focus:outline-none"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(p => (
          <Card key={p.id} className="" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold" style={{ color: 'var(--text)' }}>{p.name}</p>
                  <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Owner: {p.owner}</p>
                </div>
                <StatusBadge status={p.status === 'delayed' ? 'delayed' : 'active'} />
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-strong)' }}>
                <div className="h-full" style={{ width: `${p.progress}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }} />
              </div>
              <div className="flex items-center justify-between text-sm text-[#7a5a48]">
                <span>Progress</span>
                <span>{p.progress}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
