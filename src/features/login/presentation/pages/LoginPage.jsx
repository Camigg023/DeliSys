import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  Lock,
  User,
  AlertCircle,
  ChefHat,
  ShoppingBag,
  Users,
  BarChart2,
  ClipboardList,
} from 'lucide-react'
import { useAuth } from '../../../../context/AuthContext'

// Paleta de colores del proyecto
const C = {
  primary:    '#C0522A',
  secondary:  '#D4892A',
  background: '#FDF8F2',
  card:       '#FFFFFF',
  sidebar:    '#3A4A2E',
  text:       '#2C1810',
  muted:      '#7A6E67',
  error:      '#A03020',
  border:     '#E8E0D8',
  inputBg:    '#FAFAF7',
}

const FEATURES = [
  { icon: BarChart2,    label: 'Dashboard de ventas' },
  { icon: ShoppingBag,  label: 'Control de pedidos'  },
  { icon: ClipboardList,label: 'Gestión de inventario'},
  { icon: Users,        label: 'Administración de empleados'},
]

export default function LoginPage() {
  const [username, setUsername]         = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]               = useState('')
  const [loading, setLoading]           = useState(false)

  const { login }  = useAuth()
  const navigate   = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ─── helpers de estilo inline ─── */
  const inputBase = {
    border:          `1.5px solid ${C.border}`,
    backgroundColor: C.inputBg,
    color:           C.text,
    transition:      'border-color 0.15s, box-shadow 0.15s',
  }
  const onFocus = (e) => {
    e.target.style.borderColor = C.primary
    e.target.style.boxShadow   = `0 0 0 3px rgba(192,82,42,0.12)`
  }
  const onBlur  = (e) => {
    e.target.style.borderColor = C.border
    e.target.style.boxShadow   = 'none'
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: C.background }}>

      {/* ══════════════════ PANEL IZQUIERDO ══════════════════ */}
      <div
        className="hidden lg:flex lg:w-[58%] flex-col justify-between p-12 relative overflow-hidden animate-fade-in"
        style={{ backgroundColor: C.sidebar }}
      >
        {/* Círculos decorativos */}
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full"
          style={{ backgroundColor: 'rgba(192,82,42,0.15)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full translate-x-1/3 translate-y-1/3"
          style={{ backgroundColor: 'rgba(212,137,42,0.12)' }}
        />
        <div
          className="absolute top-1/2 -right-16 w-48 h-48 rounded-full"
          style={{ backgroundColor: 'rgba(253,248,242,0.04)' }}
        />

        {/* Logo superior */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: 'rgba(192,82,42,0.25)' }}
          >
            <ChefHat size={26} color={C.primary} />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">
            DeliSys
          </span>
        </div>

        {/* Centro — Titular */}
        <div className="relative z-10 py-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              backgroundColor: 'rgba(212,137,42,0.2)',
              color: C.secondary,
              border: `1px solid rgba(212,137,42,0.3)`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Sistema activo
          </div>

          <h1
            className="text-4xl xl:text-5xl font-bold leading-tight mb-4"
            style={{ color: '#FFFFFF' }}
          >
            Gestión integral
            <br />
            <span style={{ color: C.secondary }}>para tu restaurante</span>
          </h1>

          <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Controla ventas, inventario, empleados y pedidos desde un solo
            lugar — rápido, simple y confiable.
          </p>

          {/* Feature list */}
          <div className="mt-10 space-y-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Icon size={15} color="rgba(255,255,255,0.7)" />
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie */}
        <p className="relative z-10 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © 2025 DeliSys · Todos los derechos reservados
        </p>
      </div>

      {/* ══════════════════ PANEL DERECHO — FORMULARIO ══════════════════ */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-fade-slide-up">

          {/* Logo móvil */}
          <div className="flex lg:hidden flex-col items-center mb-8">
            <div
              className="p-3 rounded-2xl mb-3"
              style={{ backgroundColor: 'rgba(192,82,42,0.1)' }}
            >
              <ChefHat size={36} color={C.primary} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: C.text }}>
              DeliSys
            </h2>
          </div>

          {/* Tarjeta del formulario */}
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: C.card,
              boxShadow: '0 20px 60px rgba(44,24,16,0.10), 0 4px 16px rgba(44,24,16,0.06)',
            }}
          >
            {/* Encabezado */}
            <div className="mb-7">
              <h2 className="text-2xl font-bold mb-1" style={{ color: C.text }}>
                Bienvenido 👋
              </h2>
              <p className="text-sm" style={{ color: C.muted }}>
                Ingresa tus credenciales para acceder al sistema
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ── Usuario ── */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: C.text }}
                >
                  Usuario
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <User size={16} color={C.muted} />
                  </span>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Tu nombre de usuario"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                    style={inputBase}
                  />
                </div>
              </div>

              {/* ── Contraseña ── */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: C.text }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock size={16} color={C.muted} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm outline-none"
                    style={inputBase}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 transition-opacity hover:opacity-60"
                  >
                    {showPassword
                      ? <EyeOff size={16} color={C.muted} />
                      : <Eye    size={16} color={C.muted} />}
                  </button>
                </div>
              </div>

              {/* ── Error ── */}
              {error && (
                <div
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm"
                  style={{
                    backgroundColor: 'rgba(160,48,32,0.07)',
                    color: C.error,
                    border: `1px solid rgba(160,48,32,0.15)`,
                  }}
                >
                  <AlertCircle size={15} className="shrink-0" />
                  {error}
                </div>
              )}

              {/* ── Botón ── */}
              <button
                id="btn-login"
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  backgroundColor: loading ? '#c97550' : C.primary,
                  boxShadow: loading
                    ? 'none'
                    : '0 4px 14px rgba(192,82,42,0.38)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#a8451f' }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = C.primary }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Ingresando...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>

            {/* ── Credenciales de prueba ── */}
            <div
              className="mt-6 p-3.5 rounded-xl"
              style={{
                backgroundColor: '#F7F3EE',
                border: `1px solid #EDE5DA`,
              }}
            >
              <p className="text-xs font-semibold mb-1.5" style={{ color: C.muted }}>
                🔑 Credenciales de prueba
              </p>
              <div className="space-y-0.5">
                <p className="text-xs" style={{ color: C.muted }}>
                  Admin: <strong style={{ color: C.text }}>admin</strong>{' '}
                  /{' '}
                  <strong style={{ color: C.text }}>admin123</strong>
                </p>
                <p className="text-xs" style={{ color: C.muted }}>
                  Cajero: <strong style={{ color: C.text }}>cajero</strong>{' '}
                  /{' '}
                  <strong style={{ color: C.text }}>cajero123</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
