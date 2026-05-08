import React, { createContext, useContext, useState, useCallback } from 'react'
import { mockUsers } from '../data/mockData'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const register = useCallback(async (email, password, name, role = 'participant') => {
    try {
      setError(null)
      setLoading(true)
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const demoUser = {
        uid: `demo-${role}-${Date.now()}`,
        email,
      }
      const demoUserData = {
        ...demoUser,
        name,
        role,
        registeredEvents: [],
        teams: [],
      }
      
      setUser(demoUser)
      setUserData(demoUserData)
      localStorage.setItem('agratha_demo_user', JSON.stringify(demoUserData))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      setError(null)
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Demo mode: determine role from email
      const isAdmin = email.includes('admin')
      const template = isAdmin ? mockUsers.admin : mockUsers.participant
      const demoUser = { uid: template.uid, email }
      const demoUserData = { ...template, email }
      
      setUser(demoUser)
      setUserData(demoUserData)
      localStorage.setItem('agratha_demo_user', JSON.stringify(demoUserData))
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      setError(null)
      setUser(null)
      setUserData(null)
      localStorage.removeItem('agratha_demo_user')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  // Restore session on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('agratha_demo_user')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUser({ uid: parsed.uid, email: parsed.email })
        setUserData(parsed)
      } catch (e) {
        localStorage.removeItem('agratha_demo_user')
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      error,
      register,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
