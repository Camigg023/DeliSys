import { useAuth } from '../context/AuthContext'
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const C = {
  primary:    '#C0522A',
  secondary:  '#D4892A',
  background: '#FDF8F2',
  text:       '#2C1810',
  muted:      '#7A6E67',
  border:     '#E8E0D8',
  card:       '#FFFFFF',
  success:    '#4A7C59',
  error:      '#A03020',
  sidebar:    '#3A4A2E',
}

/* ── Datos mock ── */
const STATS = [
  {
    id: 'ventas',
    label: 'Ventas hoy',
    value: '$2,840',
    sub: '+12% vs ayer',
    positive: true,
    icon: TrendingUp,
    color: C.primary,
    bg: 'rgba(192,82,42,0.10)',
  },
  {
    id: 'pedidos',
    label: 'Pedidos activos',
    value: '8',
    sub: '3 en preparación',
    positive: true,
    icon: ShoppingBag,
    color: C.secondary,
    bg: 'rgba(212,137,42,0.10)',
  },
  {
    id: 'productos',
    label: 'Productos en stock',
    value: '124',
    sub: '5 con stock bajo',
    positive: false,
    icon: Package,
    color: C.success,
    bg: 'rgba(74,124,89,0.10)',
  },
  {
    id: 'empleados',
    label: 'Empleados activos',
    value: '6',
    sub: 'De 8 en nómina',
    positive: true,
    icon: Users,
    color: C.sidebar,
    bg: 'rgba(58,74,46,0.10)',
  },
]

const RECENT_SALES = [
  { id: '#0041', client: 'Mesa 3',         items: 3, total: '$285', time: 'hace 5 min',  status: 'pagado'     },
  { id: '#0040', client: 'Para llevar',     items: 1, total: '$120', time: 'hace 18 min', status: 'en prep.'   },
  { id: '#0039', client: 'Mesa 7',          items: 5, total: '$530', time: 'hace 32 min', status: 'pagado'     },
  { id: '#0038', client: 'Domicilio',       items: 2, total: '$210', time: 'hace 45 min', status: 'entregado'  },
  { id: '#0037', client: 'Mesa 1',          items: 4, total: '$445', time: 'hace 1 h',    status: 'pagado'     },
]

const QUICK_ACTIONS = [
  { label: 'Nueva venta',     to: '/ventas/nueva',         icon: ShoppingBag,   color: C.primary  },
  { label: 'Ver productos',   to: '/productos',             icon: Package,       color: C.success  },
  { label: 'Ver empleados',   to: '/empleados',             icon: Users,         color: C.sidebar  },
  { label: 'Historial',       to: '/ventas/historial',      icon: TrendingUp,    color: C.secondary},
]

const STATUS_STYLE = {
  'pagado':    { color: '#4A7C59', bg: 'rgba(74,124,89,0.10)'  },
  'en prep.':  { color: '#D4892A', bg: 'rgba(212,137,42,0.12)' },
  'entregado': { color: '#7A6E67', bg: 'rgba(122,110,103,0.12)'},
}

/* ── Barras del mini-chart (últimas 7 ventas por hora, mock) ── */
const BARS = [55, 70, 45, 80, 60, 90, 100]
const HOURS = ['8am','10am','12pm','2pm','4pm','6pm','8pm']

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

function today() {
  return new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

/* ════════════════════════════════════════════════ */
export default function DashboardPage() {
  const { user }  = useAuth()
  const navigate  = useNavigate()

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto" style={{ color: C.text }}>

      {/* ── Encabezado ── */}
      <div className="mb-8">
        <p className="text-sm mb-1" style={{ color: C.muted }}>
          {today()}
        </p>
        <h1 className="text-2xl font-bold" style={{ color: C.text }}>
          {getGreeting()}, <span style={{ color: C.primary }}>{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-sm mt-0.5" style={{ color: C.muted }}>
          Aquí tienes el resumen del día de hoy.
        </p>
      </div>

      {/* ── Tarjetas de estadísticas ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.id}
              className="rounded-2xl p-5"
              style={{
                backgroundColor: C.card,
                boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: s.bg }}
                >
                  <Icon size={18} color={s.color} />
                </div>
                <span
                  className="flex items-center gap-0.5 text-xs font-semibold"
                  style={{ color: s.positive ? C.success : C.error }}
                >
                  {s.positive
                    ? <ArrowUpRight size={13} />
                    : <ArrowDownRight size={13} />}
                </span>
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ color: C.text }}>
                {s.value}
              </p>
              <p className="text-xs" style={{ color: C.muted }}>{s.label}</p>
              <p
                className="text-xs mt-1 font-medium"
                style={{ color: s.positive ? C.success : '#D4892A' }}
              >
                {s.sub}
              </p>
            </div>
          )
        })}
      </div>

      {/* ── Fila principal: gráfico + ventas recientes ── */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">

        {/* Mini chart de ventas (col 2) */}
        <div
          className="lg:col-span-2 rounded-2xl p-6"
          style={{
            backgroundColor: C.card,
            boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-base" style={{ color: C.text }}>
                Ventas del día
              </h2>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>
                Por hora · hoy
              </p>
            </div>
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ backgroundColor: 'rgba(192,82,42,0.1)', color: C.primary }}
            >
              $2,840 total
            </span>
          </div>

          {/* Barras */}
          <div className="flex items-end gap-2 h-28">
            {BARS.map((pct, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${pct}%`,
                    backgroundColor: i === BARS.length - 1
                      ? C.primary
                      : `rgba(192,82,42,${0.15 + (pct / 100) * 0.35})`,
                  }}
                />
                <span className="text-xs" style={{ color: C.muted, fontSize: '0.65rem' }}>
                  {HOURS[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones rápidas (col 1) */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: C.card,
            boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
          }}
        >
          <h2 className="font-bold text-base mb-4" style={{ color: C.text }}>
            Accesos rápidos
          </h2>
          <div className="space-y-2">
            {QUICK_ACTIONS.map(({ label, to, icon: Icon, color }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left"
                style={{ color: C.text }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = C.background
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon size={15} color={color} />
                </div>
                <span className="flex-1">{label}</span>
                <ChevronRight size={14} style={{ color: C.muted }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ventas recientes ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: C.card,
          boxShadow: '0 2px 12px rgba(44,24,16,0.06)',
        }}
      >
        {/* Header tabla */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: C.border }}
        >
          <h2 className="font-bold text-base" style={{ color: C.text }}>
            Ventas recientes
          </h2>
          <button
            onClick={() => navigate('/ventas/historial')}
            className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: C.primary }}
          >
            Ver historial <ChevronRight size={13} />
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {['Pedido', 'Cliente', 'Productos', 'Total', 'Hora', 'Estado'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 font-semibold"
                    style={{ color: C.muted, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_SALES.map((sale, i) => {
                const st = STATUS_STYLE[sale.status] ?? STATUS_STYLE['pagado']
                return (
                  <tr
                    key={sale.id}
                    style={{ borderBottom: i < RECENT_SALES.length - 1 ? `1px solid ${C.border}` : 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.background}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td className="px-6 py-3.5 font-semibold" style={{ color: C.primary }}>
                      {sale.id}
                    </td>
                    <td className="px-6 py-3.5" style={{ color: C.text }}>
                      {sale.client}
                    </td>
                    <td className="px-6 py-3.5" style={{ color: C.muted }}>
                      {sale.items} ítem{sale.items !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-3.5 font-semibold" style={{ color: C.text }}>
                      {sale.total}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="flex items-center gap-1.5" style={{ color: C.muted }}>
                        <Clock size={12} />
                        {sale.time}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                        style={{ backgroundColor: st.bg, color: st.color }}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Espaciado inferior */}
      <div className="h-8" />
    </div>
  )
}
