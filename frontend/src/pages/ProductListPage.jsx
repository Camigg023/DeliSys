import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  AlertTriangle,
  X,
  Check,
  ChevronDown,
  Filter,
} from 'lucide-react'
import { getProducts, deleteProduct, CATEGORIES as ALL_CATEGORIES } from '../data/productsStore'

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
  warning:    '#C07020',
}

const CATEGORIES = ['Todos', ...ALL_CATEGORIES]

const STATUS_FILTERS = [
  { value: 'all',      label: 'Todos los estados' },
  { value: 'normal',   label: 'En stock'           },
  { value: 'low',      label: 'Stock bajo'         },
  { value: 'out',      label: 'Agotado'            },
  { value: 'inactive', label: 'Inactivo'           },
]

const CATEGORY_COLORS = {
  'Platos principales': { bg: 'rgba(192,82,42,0.10)',  color: '#C0522A' },
  'Bebidas':            { bg: 'rgba(74,124,89,0.10)',   color: '#4A7C59' },
  'Entradas':           { bg: 'rgba(212,137,42,0.10)', color: '#C07020' },
  'Postres':            { bg: 'rgba(160,48,32,0.10)',   color: '#A03020' },
  'Acompañamientos':    { bg: 'rgba(58,74,46,0.10)',    color: '#3A4A2E' },
  'Ingredientes':       { bg: 'rgba(122,110,103,0.10)','color': C.muted },
}

function getStockStatus(product) {
  if (!product.active)   return 'inactive'
  if (product.stock === 0) return 'out'
  if (product.stock <= 5) return 'low'
  return 'normal'
}

const STOCK_BADGE = {
  normal:   { label: 'En stock',   color: C.success, bg: 'rgba(74,124,89,0.10)'  },
  low:      { label: 'Stock bajo', color: C.warning, bg: 'rgba(192,112,32,0.12)' },
  out:      { label: 'Agotado',    color: C.error,   bg: 'rgba(160,48,32,0.10)'  },
  inactive: { label: 'Inactivo',   color: C.muted,   bg: 'rgba(122,110,103,0.10)'},
}

/* ─── Componentes pequeños ─── */
function StatPill({ label, value, color, bg }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl"
      style={{ backgroundColor: bg }}
    >
      <span className="text-xl font-bold" style={{ color }}>{value}</span>
      <span className="text-xs" style={{ color }}>{label}</span>
    </div>
  )
}

/* ════════════════════════════════════════════════ */
export default function ProductListPage() {
  const navigate = useNavigate()

  const [products, setProducts]           = useState(() => getProducts())
  const [search, setSearch]               = useState('')
  const [catFilter, setCatFilter]         = useState('Todos')
  const [statusFilter, setStatusFilter]   = useState('all')
  const [confirmDelete, setConfirmDelete] = useState(null)

  /* ─── Stats ─── */
  const stats = useMemo(() => ({
    total:    products.length,
    normal:   products.filter((p) => getStockStatus(p) === 'normal').length,
    low:      products.filter((p) => getStockStatus(p) === 'low').length,
    out:      products.filter((p) => getStockStatus(p) === 'out').length,
    inactive: products.filter((p) => getStockStatus(p) === 'inactive').length,
  }), [products])

  /* ─── Filtrado ─── */
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCat    = catFilter === 'Todos' || p.category === catFilter
      const matchStatus = statusFilter === 'all' || getStockStatus(p) === statusFilter
      return matchSearch && matchCat && matchStatus
    })
  }, [products, search, catFilter, statusFilter])

  /* ─── Acciones ─── */
  const handleDelete = (id) => {
    deleteProduct(id)
    setProducts(getProducts())
    setConfirmDelete(null)
  }

  /* ─────────────────────────────────── RENDER ─── */
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">

      {/* ── Encabezado ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: C.muted }}>
            Inventario
          </p>
          <h1 className="text-2xl font-bold" style={{ color: C.text }}>
            Productos
          </h1>
        </div>

        <button
          id="btn-new-product"
          onClick={() => navigate('/productos/nuevo')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150"
          style={{ backgroundColor: C.primary, boxShadow: '0 4px 14px rgba(192,82,42,0.30)' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#a8451f' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.primary  }}
        >
          <Plus size={16} />
          Nuevo producto
        </button>
      </div>

      {/* ── Stats pills ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        <StatPill label="total"     value={stats.total}    color={C.text}    bg={`rgba(44,24,16,0.06)`}      />
        <StatPill label="en stock"  value={stats.normal}   color={C.success} bg="rgba(74,124,89,0.10)"        />
        <StatPill label="stock bajo" value={stats.low}     color={C.warning} bg="rgba(192,112,32,0.12)"       />
        <StatPill label="agotado"   value={stats.out}      color={C.error}   bg="rgba(160,48,32,0.10)"        />
        {stats.inactive > 0 && (
          <StatPill label="inactivo" value={stats.inactive} color={C.muted}  bg="rgba(122,110,103,0.10)"     />
        )}
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search size={15} color={C.muted} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="product-search"
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              border: `1.5px solid ${C.border}`,
              backgroundColor: C.card,
              color: C.text,
            }}
            onFocus={(e) => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(192,82,42,0.10)' }}
            onBlur={(e)  => { e.target.style.borderColor = C.border;  e.target.style.boxShadow = 'none' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={14} color={C.muted} />
            </button>
          )}
        </div>

        {/* Categoría */}
        <div className="relative">
          <Filter size={13} color={C.muted} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            id="filter-category"
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="appearance-none pl-8 pr-8 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
            style={{
              border: `1.5px solid ${C.border}`,
              backgroundColor: C.card,
              color: C.text,
            }}
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={13} color={C.muted} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Estado */}
        <div className="relative">
          <select
            id="filter-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
            style={{
              border: `1.5px solid ${C.border}`,
              backgroundColor: C.card,
              color: C.text,
            }}
          >
            {STATUS_FILTERS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <ChevronDown size={13} color={C.muted} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Tabla ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: C.card,
          boxShadow: '0 2px 16px rgba(44,24,16,0.07)',
        }}
      >
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="p-4 rounded-2xl mb-4"
              style={{ backgroundColor: 'rgba(192,82,42,0.08)' }}
            >
              <Package size={36} color={C.primary} />
            </div>
            <p className="font-semibold mb-1" style={{ color: C.text }}>
              Sin resultados
            </p>
            <p className="text-sm" style={{ color: C.muted }}>
              No hay productos que coincidan con tu búsqueda.
            </p>
            <button
              onClick={() => { setSearch(''); setCatFilter('Todos'); setStatusFilter('all') }}
              className="mt-4 text-sm font-semibold underline underline-offset-2"
              style={{ color: C.primary }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {['#', 'Producto', 'Categoría', 'Precio', 'Stock', 'Estado', 'Acciones'].map((h) => (
                    <th
                      key={h}
                      className={`px-5 py-3.5 font-semibold ${h === '#' || h === 'Precio' || h === 'Stock' ? 'text-center' : 'text-left'}`}
                      style={{ color: C.muted, fontSize: '0.70rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => {
                  const status  = getStockStatus(product)
                  const badge   = STOCK_BADGE[status]
                  const catStyle = CATEGORY_COLORS[product.category] ?? { bg: 'rgba(122,110,103,0.10)', color: C.muted }
                  const isDeleting = confirmDelete === product.id

                  return (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none',
                        backgroundColor: isDeleting ? 'rgba(160,48,32,0.05)' : 'transparent',
                        transition: 'background-color 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        if (!isDeleting) e.currentTarget.style.backgroundColor = C.background
                      }}
                      onMouseLeave={(e) => {
                        if (!isDeleting) e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      {/* # */}
                      <td className="px-5 py-3.5 text-center text-xs" style={{ color: C.muted }}>
                        {product.id.toString().padStart(2, '0')}
                      </td>

                      {/* Nombre */}
                      <td className="px-5 py-3.5">
                        <span className="font-semibold" style={{ color: C.text }}>
                          {product.name}
                        </span>
                      </td>

                      {/* Categoría */}
                      <td className="px-5 py-3.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: catStyle.bg, color: catStyle.color }}
                        >
                          {product.category}
                        </span>
                      </td>

                      {/* Precio */}
                      <td className="px-5 py-3.5 text-center font-semibold" style={{ color: C.text }}>
                        ${product.price}
                      </td>

                      {/* Stock */}
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className="font-bold text-base"
                          style={{
                            color: status === 'out' ? C.error
                              : status === 'low'    ? C.warning
                              : C.text,
                          }}
                        >
                          {product.stock}
                        </span>
                        {(status === 'low' || status === 'out') && (
                          <AlertTriangle
                            size={12}
                            className="inline ml-1.5 mb-0.5"
                            color={status === 'out' ? C.error : C.warning}
                          />
                        )}
                      </td>

                      {/* Estado */}
                      <td className="px-5 py-3.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: badge.bg, color: badge.color }}
                        >
                          {badge.label}
                        </span>
                      </td>

                      {/* Acciones */}
                      <td className="px-5 py-3.5">
                        {isDeleting ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs mr-1" style={{ color: C.error }}>
                              ¿Eliminar?
                            </span>
                            <button
                              id={`btn-confirm-delete-${product.id}`}
                              onClick={() => handleDelete(product.id)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                              style={{ backgroundColor: C.error }}
                            >
                              <Check size={12} /> Sí
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                              style={{ backgroundColor: C.border, color: C.muted }}
                            >
                              <X size={12} /> No
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <button
                              id={`btn-edit-${product.id}`}
                              onClick={() => navigate(`/productos/${product.id}`)}
                              className="p-2 rounded-lg transition-all duration-150"
                              title="Editar"
                              style={{ color: C.muted }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(192,82,42,0.10)'
                                e.currentTarget.style.color = C.primary
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                                e.currentTarget.style.color = C.muted
                              }}
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              id={`btn-delete-${product.id}`}
                              onClick={() => setConfirmDelete(product.id)}
                              className="p-2 rounded-lg transition-all duration-150"
                              title="Eliminar"
                              style={{ color: C.muted }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(160,48,32,0.10)'
                                e.currentTarget.style.color = C.error
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                                e.currentTarget.style.color = C.muted
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {filtered.length > 0 && (
          <div
            className="flex items-center justify-between px-5 py-3 border-t"
            style={{ borderColor: C.border }}
          >
            <p className="text-xs" style={{ color: C.muted }}>
              Mostrando <strong style={{ color: C.text }}>{filtered.length}</strong>{' '}
              de <strong style={{ color: C.text }}>{products.length}</strong> producto{products.length !== 1 ? 's' : ''}
            </p>
            {(search || catFilter !== 'Todos' || statusFilter !== 'all') && (
              <button
                onClick={() => { setSearch(''); setCatFilter('Todos'); setStatusFilter('all') }}
                className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
                style={{ color: C.primary }}
              >
                <X size={12} /> Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      <div className="h-8" />
    </div>
  )
}
