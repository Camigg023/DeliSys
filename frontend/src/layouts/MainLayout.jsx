import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  History,
  Package,
  AlertTriangle,
  Users,
  UserCheck,
  CalendarDays,
  ChefHat,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const C = {
  sidebar:    '#3A4A2E',
  sidebarHov: '#2E3C24',
  primary:    '#C0522A',
  secondary:  '#D4892A',
  background: '#FDF8F2',
  text:       '#2C1810',
  muted:      '#7A6E67',
  border:     '#E8E0D8',
  card:       '#FFFFFF',
}

const NAV_GROUPS = [
  {
    label: null,
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Ventas',
    items: [
      { to: '/ventas/nueva',     icon: ShoppingBag, label: 'Nueva venta' },
      { to: '/ventas/historial', icon: History,     label: 'Historial'   },
    ],
  },
  {
    label: 'Inventario',
    items: [
      { to: '/productos',          icon: Package,       label: 'Productos'   },
      { to: '/alertas-vencimiento',icon: AlertTriangle, label: 'Vencimientos'},
    ],
  },
  {
    label: 'Personas',
    items: [
      { to: '/empleados', icon: Users,      label: 'Empleados' },
      { to: '/clientes',  icon: UserCheck,  label: 'Clientes'  },
    ],
  },
  {
    label: 'Organización',
    items: [
      { to: '/horarios', icon: CalendarDays, label: 'Horarios' },
    ],
  },
]

/* ─── Ítem de navegación ─── */
function NavItem({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
          isActive ? 'nav-active' : 'nav-idle'
        }`
      }
      style={({ isActive }) => ({
        backgroundColor: isActive ? 'rgba(192,82,42,0.18)' : 'transparent',
        color: isActive ? '#D4892A' : 'rgba(255,255,255,0.65)',
      })}
      onMouseEnter={(e) => {
        if (!e.currentTarget.classList.contains('nav-active'))
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
      }}
      onMouseLeave={(e) => {
        if (!e.currentTarget.classList.contains('nav-active'))
          e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <Icon size={17} />
      <span className="flex-1">{label}</span>
      <ChevronRight size={13} style={{ opacity: 0.4 }} />
    </NavLink>
  )
}

/* ─── Sidebar content (shared entre desktop y drawer móvil) ─── */
function SidebarContent({ onNavClick, user, onLogout }) {
  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: C.sidebar }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 py-5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div
          className="p-2 rounded-xl"
          style={{ backgroundColor: 'rgba(192,82,42,0.22)' }}
        >
          <ChefHat size={20} color={C.primary} />
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">DeliSys</p>
          <p className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Gestión de restaurante
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label ?? 'main'}>
            {group.label && (
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1.5 px-3"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem key={item.to} {...item} onClick={onNavClick} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Usuario + logout */}
      <div
        className="px-4 py-4 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{ backgroundColor: C.primary, color: '#fff' }}
          >
            {user?.name?.charAt(0) ?? '?'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {user?.role === 'admin' ? 'Administrador' : 'Cajero'}
            </p>
          </div>
        </div>

        <button
          id="btn-sidebar-logout"
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-150"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(160,48,32,0.2)'
            e.currentTarget.style.color = '#f87171'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          }}
        >
          <LogOut size={15} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

/* ─── Layout principal ─── */
export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate          = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: C.background }}>

      {/* ── Sidebar desktop (fijo) ── */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0 fixed inset-y-0 left-0 z-30"
        style={{ backgroundColor: C.sidebar }}
      >
        <SidebarContent user={user} onLogout={handleLogout} onNavClick={null} />
      </aside>

      {/* ── Drawer móvil ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
            onClick={closeMobile}
          />
          {/* Drawer */}
          <aside
            className="absolute inset-y-0 left-0 w-72 flex flex-col z-50"
            style={{ backgroundColor: C.sidebar }}
          >
            <SidebarContent user={user} onLogout={handleLogout} onNavClick={closeMobile} />
          </aside>
        </div>
      )}

      {/* ── Contenido principal ── */}
      <div className="flex-1 flex flex-col lg:pl-64">

        {/* Top bar móvil */}
        <header
          className="lg:hidden flex items-center gap-3 px-4 py-3 border-b sticky top-0 z-20"
          style={{ backgroundColor: C.card, borderColor: C.border }}
        >
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: C.text }}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <ChefHat size={18} color={C.primary} />
            <span className="font-bold text-base" style={{ color: C.text }}>
              DeliSys
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
