import { createContext, useContext, useState, useEffect } from 'react'
import { loginService, logoutService } from '../services/authService'

const AuthContext = createContext(null)

const SESSION_KEY = 'delisys_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // true mientras se lee sessionStorage

  // Restaurar sesión al recargar
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY)
      if (stored) setUser(JSON.parse(stored))
    } catch {
      sessionStorage.removeItem(SESSION_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const userData = await loginService(username, password)
    setUser(userData)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData))
    return userData
  }

  const logout = async () => {
    await logoutService()
    setUser(null)
    sessionStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
