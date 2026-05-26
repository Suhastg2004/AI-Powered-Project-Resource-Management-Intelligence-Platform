import React from 'react'
import Card from '../components/Card'
import { useAuth } from '../context/AuthContext'
import { projects } from '../data/projects'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const sampleArea = [
  { name: 'Week 1', value: 30 },
  { name: 'Week 2', value: 45 },
  { name: 'Week 3', value: 60 },
  { name: 'Week 4', value: 50 }
]

export default function Dashboard() {
  const { user } = useAuth()
  const role = user?.role || 'Developer'
  const capabilities = {
    Admin: [
      'Create and archive projects',
      'Assign managers to projects',
      'Upload project data via CSV',
      'View platform-wide project status'
    ],
    Manager: [
      'Create and manage sprints',
      'Assign tasks to developers',
      'Update task status and priority',
      'Add feedback and sprint retrospective notes'
    ],
    Developer: [
      'View assigned tasks and deadlines',
      'Update progress (To Do / In Progress / Done)',
      'View individual performance scores',
      'View project delay risk predictions'
    ]
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        <Card className="shadow-sm" style={{ background: 'linear-gradient(135deg, var(--surface), var(--surface-strong))', color: 'var(--text)' }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em]" style={{ color: 'var(--accent)' }}>Total Projects</p>
              <p className="mt-3 text-4xl font-semibold">{projects.length}</p>
            </div>
            <div className="rounded-3xl px-4 py-3" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>Live</div>
          </div>
        </Card>
        <Card className="shadow-sm" style={{ background: 'linear-gradient(135deg, var(--surface), var(--surface-strong))', color: 'var(--text)' }}>
          <div>
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: 'var(--accent)' }}>Active Sprints</p>
            <p className="mt-3 text-4xl font-semibold">4</p>
          </div>
        </Card>
        <Card className="shadow-sm" style={{ background: 'linear-gradient(135deg, var(--surface), var(--surface-strong))', color: 'var(--text)' }}>
          <div>
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: 'var(--accent-2)' }}>Team Members</p>
            <p className="mt-3 text-4xl font-semibold">12</p>
          </div>
        </Card>
        <Card className="shadow-sm" style={{ background: 'linear-gradient(135deg, var(--surface), var(--surface-strong))', color: 'var(--text)' }}>
          <div>
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: 'var(--muted)' }}>Delayed Projects</p>
            <p className="mt-3 text-4xl font-semibold">1</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card className="shadow-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="mb-4">
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: 'var(--accent)' }}>Role overview</p>
            <h3 className="text-xl font-semibold mt-3" style={{ color: 'var(--text-h)' }}>{role} capabilities</h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>Simulated functionality for your selected role.</p>
          </div>
          <ul className="space-y-3">
            {capabilities[role].map(item => (
              <li key={item} className="rounded-3xl p-4" style={{ background: 'var(--surface-strong)', color: 'var(--text)' }}>
                <span className="font-medium">•</span> {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="shadow-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div>
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: 'var(--accent-2)' }}>Quick actions</p>
            <h3 className="text-xl font-semibold mt-3" style={{ color: 'var(--text-h)' }}>What you can do next</h3>
          </div>
          <div className="mt-5 space-y-4">
            {role === 'Admin' && (
              <p style={{ color: 'var(--muted)' }}>Use Projects to create and archive projects, assign managers, and monitor platform-wide status.</p>
            )}
            {role === 'Manager' && (
              <p style={{ color: 'var(--muted)' }}>Use Sprints to manage sprint boards and Tasks to assign work, update status, and log feedback.</p>
            )}
            {role === 'Developer' && (
              <p style={{ color: 'var(--muted)' }}>Use Tasks to track your assigned work, update progress, and review risk and performance insights.</p>
            )}
          </div>
        </Card>
      </div>

      {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2 shadow-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold" style={{ color: 'var(--text-h)' }}>Sprint velocity</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Current release performance</p>
            </div>
            <span className="rounded-full px-3 py-1 text-sm" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>Analytical</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[{name:'Sprint 1', points:34},{name:'Sprint 2', points:40},{name:'Sprint 3', points:28}]}> 
              <XAxis dataKey="name" tick={{ fill: 'var(--muted)' }} />
              <YAxis tick={{ fill: 'var(--muted)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg)', borderRadius: 12, borderColor: 'var(--accent-border)' }} />
              <Bar dataKey="points" fill="var(--accent)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="shadow-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-h)' }}>Utilization trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={sampleArea}>
              <XAxis dataKey="name" tick={{ fill: 'var(--muted)' }} />
              <YAxis tick={{ fill: 'var(--muted)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg)', borderRadius: 12, borderColor: 'var(--accent-border)' }} />
              <Line type="monotone" dataKey="value" stroke="var(--accent-2)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div> */}

      {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="shadow-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-semibold mb-4 text-[#3b2413]">Project health</h3>
          <div className="space-y-4">
              {projects.map(p => (
              <div key={p.id} className="flex items-center justify-between gap-4 rounded-3xl p-4" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{p.name}</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Owner: {p.owner}</p>
                </div>
                <span className="text-sm" style={{ color: 'var(--muted)' }}>{p.health}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="shadow-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-h)' }}>Risk distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={[{name:'Low', value:60},{name:'Med', value:30},{name:'High', value:10}]} dataKey="value" outerRadius={70}>
                <Cell fill="#22c55e" />
                <Cell fill="#f59e0b" />
                <Cell fill="#ef4444" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="shadow-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-h)' }}>Weekly trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sampleArea}>
              <Line type="monotone" dataKey="value" stroke="var(--accent-2)" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div> */}
    </div>
  )
}
