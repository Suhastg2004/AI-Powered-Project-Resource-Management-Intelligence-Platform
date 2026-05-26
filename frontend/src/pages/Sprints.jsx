import React from 'react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import { tasks } from '../data/tasks'

export default function Sprints() {
  const { user } = useAuth()
  const isManager = user?.role === 'Manager'
  const columns = [
    { key: 'todo', title: 'To Do' },
    { key: 'in-progress', title: 'In Progress' },
    { key: 'done', title: 'Done' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-3xl font-semibold" style={{ color: 'var(--text)' }}>Sprints</h3>
          <p className="mt-1" style={{ color: 'var(--muted)' }}>Sprint board for planning, assigning, and tracking developer work.</p>
        </div>
        {isManager && (
          <button className="rounded-3xl px-5 py-3 font-semibold transition" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))', color: 'var(--text-h)' }}>
            Create new sprint
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => (
          <div key={col.key} className="rounded-3xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>{col.title}</h4>
            <div className="space-y-3">
              {tasks.filter(t => t.status === col.key).map(t => (
                <Card key={t.id} className="p-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="font-semibold" style={{ color: 'var(--text)' }}>{t.title}</div>
                  <div className="text-sm" style={{ color: 'var(--muted)' }}>{t.assignee} • {t.priority}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>{t.due} due</div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Card style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--text)' }}>Manager workflow</h4>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          {isManager
            ? 'As a manager, you can create and manage sprints, assign tasks, update status and priority, and capture retrospective feedback.'
            : 'This sprint board is where managers plan work and developers monitor assignment progress.'}
        </p>
      </Card>
    </div>
  )
}
