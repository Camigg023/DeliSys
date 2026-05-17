import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Printer } from 'lucide-react'
import { getSaleById } from '../../../../data/salesStore'

export default function InvoiceViewPage() {
  const { id } = useParams()
  const sale = getSaleById(decodeURIComponent(id))

  if (!sale) {
    return <div className="p-8 max-w-3xl mx-auto text-text"><Link to="/ventas/historial" className="text-primary">← Volver al historial</Link><div className="mt-8 bg-card rounded-2xl p-8 text-center text-muted">Factura no encontrada. Las ventas mock se conservan solo durante la sesión actual.</div></div>
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto text-text">
      <div className="flex justify-between items-center mb-6"><Link to="/ventas/historial" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary"><ArrowLeft size={16}/> Volver</Link><button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-semibold"><Printer size={16}/> Imprimir</button></div>
      <div className="bg-card rounded-3xl p-8 shadow-sm border border-muted/10">
        <div className="flex justify-between gap-4 border-b border-muted/10 pb-6 mb-6"><div><h1 className="text-3xl font-bold text-primary">DeliSys</h1><p className="text-sm text-muted">Restaurante familiar</p></div><div className="text-right"><p className="font-bold text-xl">Factura {sale.id}</p><p className="text-sm text-muted">{new Date(sale.timestamp).toLocaleString('es-MX')}</p></div></div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6"><div><p className="text-xs font-bold uppercase text-muted">Cliente</p><p className="font-semibold">{sale.customerName}</p></div><div><p className="text-xs font-bold uppercase text-muted">Método de pago</p><p className="font-semibold capitalize">{sale.paymentMethod === 'transferencia' ? 'Transferencia' : 'Efectivo'}</p></div></div>
        <table className="w-full text-sm mb-6"><thead><tr className="text-left text-muted border-b border-muted/10"><th className="py-2">Producto</th><th className="py-2 text-center">Cant.</th><th className="py-2 text-right">Precio</th><th className="py-2 text-right">Total</th></tr></thead><tbody>{sale.items.map((item) => <tr key={item.id} className="border-b border-muted/10"><td className="py-3 font-medium">{item.name}</td><td className="py-3 text-center">{item.quantity}</td><td className="py-3 text-right">${Number(item.price).toFixed(2)}</td><td className="py-3 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</td></tr>)}</tbody></table>
        <div className="ml-auto max-w-xs space-y-2"><Row label="Subtotal" value={sale.subtotal}/><Row label="IVA" value={sale.tax}/><div className="flex justify-between text-xl font-bold border-t border-muted/10 pt-3"><span>Total</span><span className="text-primary">${Number(sale.total).toFixed(2)}</span></div></div>
      </div>
    </div>
  )
}
function Row({ label, value }) { return <div className="flex justify-between text-sm text-muted"><span>{label}</span><span>${Number(value).toFixed(2)}</span></div> }
