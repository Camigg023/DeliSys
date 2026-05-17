import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Protege rutas que requieren autenticación.
 * Mientras se restaura la sesión muestra un spinner.
 * Si no hay usuario redirige a /login.
 */
export default function PrivateRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#FDF8F2' }}
      >
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10"
            style={{ color: '#C0522A' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-sm font-medium" style={{ color: '#7A6E67' }}>
            Cargando...
          </p>
        </div>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
