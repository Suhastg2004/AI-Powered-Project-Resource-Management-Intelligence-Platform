import React from 'react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import { tasks } from '../data/tasks'

const statusStyles = {
  todo: 'bg-amber-100 text-amber-700',
  'in-progress': 'bg-sky-100 text-sky-700',
  done: 'bg-emerald-100 text-emerald-700'
}

export default function Tasks() {
  const { user } = useAuth()
  const isDeveloper = user?.role === 'Developer'
  const assignedTasks = isDeveloper
    ? tasks.filter(t => user.name && t.assignee.toLowerCase().includes(user.name.split(' ')[0].toLowerCase()))
    : tasks

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-3xl font-semibold" style={{ color: 'var(--text)' }}>Tasks</h3>
          <p className="mt-1" style={{ color: 'var(--muted)' }}>Track task progress, priority, deadlines, and developer assignments.</p>
        </div>
      </div>

      <Card style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="mb-4">
          <h4 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Workflow</h4>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {isDeveloper
              ? 'Update your task progress from To Do to In Progress to Done, and review your assigned deadlines and performance insights.'
              : 'Review tasks by assignee, due date, priority, and status. Managers can assign work and update priorities.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="p-3" style={{ color: 'var(--muted)' }}>Title</th>
                <th className="p-3" style={{ color: 'var(--muted)' }}>Assignee</th>
                <th className="p-3" style={{ color: 'var(--muted)' }}>Priority</th>
                <th className="p-3" style={{ color: 'var(--muted)' }}>Due</th>
                <th className="p-3" style={{ color: 'var(--muted)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(assignedTasks.length ? assignedTasks : tasks).map(t => (
                <tr key={t.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td className="p-3" style={{ color: 'var(--text)' }}>{t.title}</td>
                  <td className="p-3" style={{ color: 'var(--muted)' }}>{t.assignee}</td>
                  <td className="p-3" style={{ color: 'var(--text)' }}>{t.priority}</td>
                  <td className="p-3" style={{ color: 'var(--text)' }}>{t.due}</td>
                  <td className="p-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[t.status]}`}>
                      {t.status.replace('-', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
