import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = localStorage.getItem('rm_token')
    const u = localStorage.getItem('rm_user')
    if (t) setToken(t)
    if (u) setUser(JSON.parse(u))
  }, [])

  const login = (payload = { name: 'Demo User', role: 'Developer' }) => {
    const fake = 'fake-jwt-token'
    const userPayload = {
      name: payload.name || payload.username || 'Demo User',
      email: payload.email || '',
      username: payload.username || '',
      role: payload.role || 'Developer'
    }
    localStorage.setItem('rm_token', fake)
    localStorage.setItem('rm_user', JSON.stringify(userPayload))
    setToken(fake)
    setUser(userPayload)
    navigate('/dashboard')
  }

  const register = (payload = { name: 'New User', role: 'Developer' }) => {
    // Simulate registration and return to login for explicit sign-in
    navigate('/login')
  }

  const logout = () => {
    localStorage.removeItem('rm_token')
    localStorage.removeItem('rm_user')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
