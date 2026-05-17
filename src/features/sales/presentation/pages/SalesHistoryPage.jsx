import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, History, Receipt } from 'lucide-react'
import { getSalesHistory } from '../../../../data/salesStore'

const toDateInput = (timestamp) => new Date(timestamp).toISOString().slice(0, 10)
const paymentLabel = (method) => method === 'transferencia' ? 'Transferencia' : 'Efectivo'

export default function SalesHistoryPage() {
  const [sales] = useState(() => getSalesHistory())
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('todos')

  const filteredSales = useMemo(() => sales.filter((sale) => {
    const saleDate = toDateInput(sale.timestamp)
    const matchFrom = !fromDate || saleDate >= fromDate
    const matchTo = !toDate || saleDate <= toDate
    const matchPayment = paymentFilter === 'todos' || sale.paymentMethod === paymentFilter
    return matchFrom && matchTo && matchPayment
  }), [sales, fromDate, toDate, paymentFilter])

  const total = filteredSales.reduce((acc, s) => acc + Number(s.total || 0), 0)

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto text-text">
      <div className="mb-6"><p className="text-sm text-muted">Ventas</p><h1 className="text-2xl font-bold">Historial de ventas</h1></div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card label="Ventas filtradas" value={filteredSales.length} />
        <Card label="Ingresos filtrados" value={`$${total.toFixed(2)}`} />
        <Card label="Total histórico" value={sales.length} />
      </div>

      <div className="bg-card rounded-2xl border border-muted/10 shadow-sm p-4 mb-5">
        <div className="grid md:grid-cols-4 gap-3">
          <label className="space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">Desde</span><input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary" /></label>
          <label className="space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">Hasta</span><input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary" /></label>
          <label className="space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">Pago</span><select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary"><option value="todos">Todos</option><option value="efectivo">Efectivo</option><option value="transferencia">Transferencia</option></select></label>
          <div className="flex items-end"><button onClick={() => { setFromDate(''); setToDate(''); setPaymentFilter('todos') }} className="w-full px-4 py-2.5 rounded-xl bg-background text-muted font-semibold hover:text-primary">Limpiar filtros</button></div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-muted/10 shadow-sm overflow-hidden">
        {filteredSales.length === 0 ? <div className="py-20 text-center text-muted"><History size={42} className="mx-auto mb-3 opacity-30" /><p>No hay ventas para los filtros seleccionados.</p></div> : filteredSales.map((s) => (
          <div key={s.id} className="grid md:grid-cols-12 gap-3 px-5 py-4 border-t border-muted/10 items-center">
            <div className="md:col-span-3 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Receipt size={18}/></div><div><p className="font-bold">{s.id}</p><p className="text-xs text-muted">{new Date(s.timestamp).toLocaleString('es-MX')}</p></div></div>
            <p className="md:col-span-2 text-sm">{s.customerName}</p>
            <p className="md:col-span-2 text-sm text-muted">{s.items?.length ?? 0} productos</p>
            <p className="md:col-span-2 text-sm font-semibold">{paymentLabel(s.paymentMethod)}</p>
            <p className="md:col-span-1 font-bold text-primary">${Number(s.total).toFixed(2)}</p>
            <div className="md:col-span-2 md:text-right"><Link to={`/ventas/factura/${encodeURIComponent(s.id)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><Eye size={16}/> Ver factura</Link></div>
          </div>
        ))}
      </div>
    </div>
  )
}
function Card({ label, value }) { return <div className="bg-card rounded-2xl p-5 border border-muted/10 shadow-sm"><p className="text-sm text-muted">{label}</p><p className="text-2xl font-bold text-primary mt-1">{value}</p></div> }
