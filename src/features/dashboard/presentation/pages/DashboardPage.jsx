import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { getProducts } from '../../../../data/productsStore'
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ChevronRight,
  AlertTriangle,
  BarChart3,
  PieChart,
} from 'lucide-react'

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

const DAILY_SALES = [
  { hour: '8am', total: 220 },
  { hour: '10am', total: 390 },
  { hour: '12pm', total: 780 },
  { hour: '2pm', total: 620 },
  { hour: '4pm', total: 460 },
  { hour: '6pm', total: 870 },
  { hour: '8pm', total: 1040 },
]

const TOP_PRODUCTS = [
  { name: 'Tacos de Barbacoa', sold: 32, revenue: 2720 },
  { name: 'Enchiladas Verdes', sold: 21, revenue: 1575 },
  { name: 'Hamburguesa de la Casa', sold: 18, revenue: 1710 },
  { name: 'Agua de Jamaica', sold: 17, revenue: 425 },
  { name: 'Flan de Cajeta', sold: 11, revenue: 385 },
]

const RECENT_SALES = [
  { id: '#0041', client: 'Mesa 3',         items: 3, total: '$285', time: 'hace 5 min',  status: 'pagado'     },
  { id: '#0040', client: 'Para llevar',     items: 1, total: '$120', time: 'hace 18 min', status: 'en prep.'   },
  { id: '#0039', client: 'Mesa 7',          items: 5, total: '$530', time: 'hace 32 min', status: 'pagado'     },
  { id: '#0038', client: 'Domicilio',       items: 2, total: '$210', time: 'hace 45 min', status: 'entregado'  },
  { id: '#0037', client: 'Mesa 1',          items: 4, total: '$445', time: 'hace 1 h',    status: 'pagado'     },
]

const STATUS_STYLE = {
  'pagado':    { color: '#4A7C59', bg: 'rgba(74,124,89,0.10)'  },
  'en prep.':  { color: '#D4892A', bg: 'rgba(212,137,42,0.12)' },
  'entregado': { color: '#7A6E67', bg: 'rgba(122,110,103,0.12)'},
}

const CATEGORY_COLORS = ['#C0522A', '#D4892A', '#4A7C59', '#A03020', '#3A4A2E', '#7A6E67']

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

function money(value) {
  return `$${Number(value).toLocaleString('es-MX')}`
}

function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{ backgroundColor: C.card, boxShadow: '0 2px 12px rgba(44,24,16,0.06)' }}
    >
      {children}
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const products = useMemo(() => getProducts(), [])

  const dashboard = useMemo(() => {
    const totalSales = DAILY_SALES.reduce((sum, s) => sum + s.total, 0)
    const activeProducts = products.filter((p) => p.active)
    const lowStock = products.filter((p) => p.active && p.stock > 0 && p.stock <= 5)
    const outStock = products.filter((p) => p.active && p.stock === 0)
    const categoryMap = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {})
    const categoryData = Object.entries(categoryMap).map(([name, value], index) => ({
      name,
      value,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))
    return { totalSales, activeProducts, lowStock, outStock, categoryData }
  }, [products])

  const maxSale = Math.max(...DAILY_SALES.map((s) => s.total))
  const maxTopProduct = Math.max(...TOP_PRODUCTS.map((p) => p.sold))
  const role = user?.role

  const stats = [
    { id: 'ventas', label: 'Ventas hoy', value: money(dashboard.totalSales), sub: '+12% vs ayer', positive: true, icon: TrendingUp, color: C.primary, bg: 'rgba(192,82,42,0.10)' },
    { id: 'pedidos', label: 'Pedidos activos', value: '8', sub: '3 en preparación', positive: true, icon: ShoppingBag, color: C.secondary, bg: 'rgba(212,137,42,0.10)' },
    { id: 'productos', label: 'Productos activos', value: dashboard.activeProducts.length, sub: `${dashboard.lowStock.length + dashboard.outStock.length} requieren atención`, positive: dashboard.lowStock.length + dashboard.outStock.length === 0, icon: Package, color: C.success, bg: 'rgba(74,124,89,0.10)' },
    { id: 'empleados', label: 'Empleados activos', value: '6', sub: 'De 8 en nómina', positive: true, icon: Users, color: C.sidebar, bg: 'rgba(58,74,46,0.10)' },
  ]

  const quickActions = [
    role === 'cashier' && { label: 'Nueva venta', to: '/ventas/nueva', icon: ShoppingBag, color: C.primary },
    role === 'admin' && { label: 'Ver productos', to: '/productos', icon: Package, color: C.success },
    role === 'admin' && { label: 'Ver empleados', to: '/empleados', icon: Users, color: C.sidebar },
    { label: 'Historial', to: '/ventas/historial', icon: TrendingUp, color: C.secondary },
  ].filter(Boolean)

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto" style={{ color: C.text }}>
      <div className="mb-8">
        <p className="text-sm mb-1" style={{ color: C.muted }}>{today()}</p>
        <h1 className="text-2xl font-bold" style={{ color: C.text }}>
          {getGreeting()}, <span style={{ color: C.primary }}>{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-sm mt-0.5" style={{ color: C.muted }}>
          Resumen operativo con ventas, inventario y productos destacados.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl" style={{ backgroundColor: s.bg }}><Icon size={18} color={s.color} /></div>
                <span className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: s.positive ? C.success : C.error }}>
                  {s.positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                </span>
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ color: C.text }}>{s.value}</p>
              <p className="text-xs" style={{ color: C.muted }}>{s.label}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: s.positive ? C.success : '#D4892A' }}>{s.sub}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-base flex items-center gap-2" style={{ color: C.text }}><BarChart3 size={17} /> Ventas del día</h2>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>Ingresos por hora · hoy</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: 'rgba(192,82,42,0.1)', color: C.primary }}>{money(dashboard.totalSales)} total</span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {DAILY_SALES.map((sale, i) => (
              <div key={sale.hour} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="text-[10px] font-bold" style={{ color: C.muted }}>{money(sale.total)}</div>
                <div className="w-full rounded-t-lg transition-all duration-500" style={{ height: `${Math.max(12, (sale.total / maxSale) * 100)}%`, backgroundColor: i === DAILY_SALES.length - 1 ? C.primary : `rgba(192,82,42,${0.18 + (sale.total / maxSale) * 0.35})` }} />
                <span className="text-xs" style={{ color: C.muted, fontSize: '0.65rem' }}>{sale.hour}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-bold text-base mb-4" style={{ color: C.text }}>Accesos rápidos</h2>
          <div className="space-y-2">
            {quickActions.map(({ label, to, icon: Icon, color }) => (
              <button key={to} onClick={() => navigate(to)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left" style={{ color: C.text }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.background }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}><Icon size={15} color={color} /></div>
                <span className="flex-1">{label}</span>
                <ChevronRight size={14} style={{ color: C.muted }} />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-base flex items-center gap-2"><PieChart size={17} /> Productos por categoría</h2>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>Distribución actual del catálogo</p>
            </div>
          </div>
          <div className="space-y-3">
            {dashboard.categoryData.map((cat) => {
              const pct = Math.round((cat.value / products.length) * 100)
              return (
                <div key={cat.name}>
                  <div className="flex justify-between text-xs font-semibold mb-1"><span>{cat.name}</span><span style={{ color: C.muted }}>{cat.value} · {pct}%</span></div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: C.background }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-base">Top productos vendidos</h2>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>Unidades e ingresos estimados</p>
            </div>
          </div>
          <div className="space-y-3">
            {TOP_PRODUCTS.map((product) => (
              <div key={product.name}>
                <div className="flex justify-between text-xs font-semibold mb-1"><span>{product.name}</span><span style={{ color: C.muted }}>{product.sold} uds · {money(product.revenue)}</span></div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: C.background }}>
                  <div className="h-full rounded-full" style={{ width: `${(product.sold / maxTopProduct) * 100}%`, backgroundColor: C.secondary }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {(dashboard.lowStock.length > 0 || dashboard.outStock.length > 0) && (
        <Card className="p-5 mb-8 border" style={{ borderColor: 'rgba(160,48,32,0.12)' }}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(160,48,32,0.10)' }}><AlertTriangle size={18} color={C.error} /></div>
            <div>
              <h2 className="font-bold text-base">Alertas de inventario</h2>
              <p className="text-sm mt-1" style={{ color: C.muted }}>
                {dashboard.outStock.length} producto(s) agotado(s) y {dashboard.lowStock.length} con stock bajo. Revisa inventario para evitar ventas sin disponibilidad.
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: C.border }}>
          <h2 className="font-bold text-base" style={{ color: C.text }}>Ventas recientes</h2>
          <button onClick={() => navigate('/ventas/historial')} className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: C.primary }}>
            Ver historial <ChevronRight size={13} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{['Pedido', 'Cliente', 'Productos', 'Total', 'Hora', 'Estado'].map((h) => <th key={h} className="text-left px-6 py-3 font-semibold" style={{ color: C.muted, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>)}</tr></thead>
            <tbody>
              {RECENT_SALES.map((sale, i) => {
                const st = STATUS_STYLE[sale.status] ?? STATUS_STYLE.pagado
                return (
                  <tr key={sale.id} style={{ borderBottom: i < RECENT_SALES.length - 1 ? `1px solid ${C.border}` : 'none' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.background} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td className="px-6 py-3.5 font-semibold" style={{ color: C.primary }}>{sale.id}</td>
                    <td className="px-6 py-3.5" style={{ color: C.text }}>{sale.client}</td>
                    <td className="px-6 py-3.5" style={{ color: C.muted }}>{sale.items} ítem{sale.items !== 1 ? 's' : ''}</td>
                    <td className="px-6 py-3.5 font-semibold" style={{ color: C.text }}>{sale.total}</td>
                    <td className="px-6 py-3.5"><span className="flex items-center gap-1.5" style={{ color: C.muted }}><Clock size={12} />{sale.time}</span></td>
                    <td className="px-6 py-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ backgroundColor: st.bg, color: st.color }}>{sale.status}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="h-8" />
    </div>
  )
}
