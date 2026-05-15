import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  X,
  Check,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'
import { getCustomers, deleteCustomer } from '../data/customersStore'

/* ─── Componentes pequeños ─── */
function StatCard({ label, value, icon: Icon, colorClass, bgClass }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-card shadow-sm border border-muted/10`}>
      <div className={`p-2 rounded-xl ${bgClass}`}>
        <Icon size={18} className={colorClass} />
      </div>
      <div>
        <p className="text-xl font-bold text-text leading-tight">{value}</p>
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted">{label}</p>
      </div>
    </div>
  )
}

export default function CustomerListPage() {
  const navigate = useNavigate()

  const [customers, setCustomers] = useState(() => getCustomers())
  const [search, setSearch] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  /* ─── Stats ─── */
  const stats = useMemo(() => ({
    total: customers.length,
    withPoints: customers.filter(c => c.points > 0).length,
    newThisMonth: 2, // Mocking some growth
  }), [customers])

  /* ─── Filtrado ─── */
  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const query = search.toLowerCase()
      return (
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.email.toLowerCase().includes(query)
      )
    })
  }, [customers, search])

  /* ─── Acciones ─── */
  const handleDelete = (id) => {
    deleteCustomer(id)
    setCustomers(getCustomers())
    setConfirmDelete(null)
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      
      {/* ── Encabezado ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-muted">
            Directorio
          </p>
          <h1 className="text-2xl font-bold text-text">
            Clientes
          </h1>
        </div>

        <button
          id="btn-new-customer"
          onClick={() => navigate('/clientes/nuevo')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-all duration-150 shadow-lg shadow-primary/20"
        >
          <Plus size={16} />
          Nuevo cliente
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard 
          label="Total Clientes" 
          value={stats.total} 
          icon={Users} 
          colorClass="text-primary" 
          bgClass="bg-primary/10" 
        />
        <StatCard 
          label="Con Puntos" 
          value={stats.withPoints} 
          icon={Check} 
          colorClass="text-success" 
          bgClass="bg-success/10" 
        />
        <StatCard 
          label="Nuevos (Mes)" 
          value={stats.newThisMonth} 
          icon={Plus} 
          colorClass="text-secondary" 
          bgClass="bg-secondary/10" 
        />
      </div>

      {/* ── Filtros ── */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <input
            id="customer-search"
            type="text"
            placeholder="Buscar por nombre, teléfono o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none bg-card border-1.5 border-muted/20 text-text focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ── Tabla ── */}
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-muted/10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 rounded-2xl mb-4 bg-primary/5">
              <Users size={40} className="text-primary/40" />
            </div>
            <p className="font-semibold text-text mb-1">No se encontraron clientes</p>
            <p className="text-sm text-muted">Prueba con otros términos de búsqueda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-muted/10">
                  {['Cliente', 'Contacto', 'Ubicación', 'Puntos', 'Acciones'].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left font-bold text-[10px] uppercase tracking-wider text-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/5">
                {filtered.map((customer) => {
                  const isDeleting = confirmDelete === customer.id
                  return (
                    <tr
                      key={customer.id}
                      className={`transition-colors hover:bg-background/50 ${isDeleting ? 'bg-error/5' : ''}`}
                    >
                      {/* Nombre */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-text">{customer.name}</p>
                            <p className="text-[11px] text-muted">ID: #{customer.id.toString().padStart(4, '0')}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contacto */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-muted">
                            <Phone size={12} className="shrink-0" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted">
                            <Mail size={12} className="shrink-0" />
                            <span>{customer.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Ubicación */}
                      <td className="px-6 py-4 max-w-[200px]">
                        <div className="flex items-start gap-2 text-xs text-muted">
                          <MapPin size={12} className="shrink-0 mt-0.5" />
                          <span className="truncate" title={customer.address}>{customer.address}</span>
                        </div>
                      </td>

                      {/* Puntos */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="px-2.5 py-1 rounded-lg bg-secondary/10 text-secondary font-bold text-xs">
                            {customer.points} pts
                          </div>
                        </div>
                      </td>

                      {/* Acciones */}
                      <td className="px-6 py-4">
                        {isDeleting ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(customer.id)}
                              className="px-3 py-1.5 rounded-lg bg-error text-white text-xs font-bold hover:bg-error/90 transition-colors"
                            >
                              Eliminar
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="px-3 py-1.5 rounded-lg bg-muted/10 text-muted text-xs font-bold hover:bg-muted/20 transition-colors"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => navigate(`/clientes/${customer.id}`)}
                              className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-all"
                              title="Editar"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => setConfirmDelete(customer.id)}
                              className="p-2 rounded-lg text-muted hover:text-error hover:bg-error/10 transition-all"
                              title="Eliminar"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              onClick={() => navigate(`/clientes/${customer.id}`)}
                              className="p-2 rounded-lg text-muted hover:text-secondary hover:bg-secondary/10 transition-all"
                              title="Ver detalles"
                            >
                              <ChevronRight size={16} />
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
      </div>

      <div className="h-10" />
    </div>
  )
}
