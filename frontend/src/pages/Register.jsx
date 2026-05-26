import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roleOptions = [
  { id: 'Admin', title: 'Admin' },
  { id: 'Manager', title: 'Manager' },
  { id: 'Developer', title: 'Developer' }
]

export default function Register() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Admin')

  const handle = e => {
    e.preventDefault()
    register({
      name: username || `${role} User`,
      email,
      username,
      role
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md rounded-[32px] border p-8 shadow-2xl" style={{ borderColor: 'var(--border)', background: 'var(--surface)', boxShadow: '0 25px 50px rgba(0,0,0,0.06)' }}>
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>New workspace</p>
          <h3 className="text-3xl font-semibold" style={{ color: 'var(--text-h)' }}>Create your account</h3>
          <p style={{ color: 'var(--muted)' }}>Choose a role and continue.</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {roleOptions.map(option => (
            <button
              type="button"
              key={option.id}
              onClick={() => setRole(option.id)}
              className="rounded-3xl border p-3 text-left transition"
              style={{
                borderColor: role === option.id ? 'var(--accent)' : 'var(--border)',
                background: role === option.id ? 'var(--surface-strong)' : 'var(--surface)',
                color: 'var(--text)'
              }}
            >
              <div className="text-sm font-semibold">{option.title}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handle} className="space-y-4">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full rounded-3xl px-4 py-3 focus:outline-none"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
          />
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-3xl px-4 py-3 focus:outline-none"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full rounded-3xl px-4 py-3 focus:outline-none"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
          />
          <button className="w-full rounded-3xl py-3 font-semibold transition" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))', color: 'var(--text-h)' }}>Create {role} account</button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="inline-flex items-center justify-center w-full rounded-3xl border px-4 py-3 text-sm font-semibold transition" style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
            Go to login
          </Link>
        </div>
      </div>
    </div>
  )
}
