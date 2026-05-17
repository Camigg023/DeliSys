import { useMemo, useState } from 'react'
import { AlertTriangle, Package, Trash2, Ban } from 'lucide-react'
import { deleteProduct, getProducts, markProductUnavailable } from '../../../../data/productsStore'

export default function ExpiryAlertsPage() {
  const [products, setProducts] = useState(() => getProducts())
  const today = useMemo(() => new Date(), [])

  const alerts = products
    .filter((p) => p.expiryDate || p.stock <= 5)
    .map((p) => ({
      ...p,
      daysLeft: p.expiryDate ? Math.ceil((new Date(`${p.expiryDate}T00:00:00`) - today) / 86400000) : null,
    }))
    .filter((p) => p.stock <= 5 || p.daysLeft === null || p.daysLeft <= 10)
    .sort((a, b) => (a.daysLeft ?? 999) - (b.daysLeft ?? 999))

  const refresh = () => setProducts(getProducts())

  const handleDelete = (id) => {
    if (!confirm('¿Eliminar este producto del inventario?')) return
    deleteProduct(id)
    refresh()
  }

  const handleUnavailable = (id) => {
    markProductUnavailable(id)
    refresh()
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto text-text">
      <div className="mb-6">
        <p className="text-sm text-muted">Inventario</p>
        <h1 className="text-2xl font-bold">Alertas de vencimiento y stock</h1>
        <p className="text-sm text-muted mt-1">Administra productos vencidos, próximos a vencer o con pocas unidades.</p>
      </div>

      <div className="grid gap-4">
        {alerts.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 text-center text-muted border border-muted/10">No hay alertas activas.</div>
        ) : alerts.map((p) => {
          const expired = p.daysLeft !== null && p.daysLeft < 0
          const urgent = p.stock <= 5 || (p.daysLeft !== null && p.daysLeft <= 7)
          return (
            <div key={p.id} className="bg-card rounded-2xl p-5 border border-muted/10 shadow-sm flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${urgent ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'}`}>
                  {urgent ? <AlertTriangle size={20}/> : <Package size={20}/>}
                </div>
                <div>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm text-muted">{p.category} · Stock: {p.stock} · Estado: {p.active ? 'Disponible' : 'No disponible'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${urgent ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'}`}>
                  {p.expiryDate ? (expired ? `Venció hace ${Math.abs(p.daysLeft)} días` : `Vence en ${p.daysLeft} días`) : 'Stock bajo'}
                </span>
                <button onClick={() => handleUnavailable(p.id)} className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-warning/10 text-warning text-sm font-semibold hover:bg-warning/20">
                  <Ban size={15} /> Marcar no disponible
                </button>
                <button onClick={() => handleDelete(p.id)} className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-error/10 text-error text-sm font-semibold hover:bg-error/20">
                  <Trash2 size={15} /> Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
