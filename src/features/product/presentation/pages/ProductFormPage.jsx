import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { CATEGORIES, createProduct, getProductById, updateProduct } from '../../../../data/productsStore'

export default function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = Boolean(id)
  const current = useMemo(() => editing ? getProductById(id) : null, [editing, id])
  const [form, setForm] = useState(() => current ?? { name: '', category: CATEGORIES[0], price: 0, stock: 0, active: true, description: '', expiryDate: '', imageUrl: '' })

  const submit = (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) }
    editing ? updateProduct(id, payload) : createProduct(payload)
    navigate('/productos')
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto text-text">
      <button onClick={() => navigate('/productos')} className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6"><ArrowLeft size={16} /> Volver</button>
      <div className="bg-card rounded-3xl p-6 shadow-sm border border-muted/10">
        <h1 className="text-2xl font-bold mb-1">{editing ? 'Editar producto' : 'Nuevo producto'}</h1>
        <p className="text-sm text-muted mb-6">Administra catálogo, inventario y vencimiento.</p>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <label className="space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">Categoría</span><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></label>
          <Field label="Precio" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
          <Field label="Stock" type="number" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} required />
          <Field label="Vencimiento" type="date" value={form.expiryDate ?? ''} onChange={(v) => setForm({ ...form, expiryDate: v })} />
          <label className="flex items-center gap-3 pt-7 text-sm font-semibold"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Producto activo</label>
          <label className="sm:col-span-2 space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">URL / ruta de foto</span><input value={form.imageUrl ?? ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/product-images/tacos-barbacoa.svg" className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary" /></label>
          {form.imageUrl && <div className="sm:col-span-2 flex items-center gap-3 rounded-2xl bg-background p-3 border border-muted/10"><img src={form.imageUrl} alt="Vista previa" className="w-20 h-20 rounded-xl object-cover" /><span className="text-sm text-muted">Vista previa de la foto del producto</span></div>}
          <label className="sm:col-span-2 space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">Descripción</span><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary" rows="4" /></label>
          <div className="sm:col-span-2 flex justify-end gap-3 pt-3"><button type="button" onClick={() => navigate('/productos')} className="px-5 py-2.5 rounded-xl text-muted hover:bg-background">Cancelar</button><button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold"><Save size={16} /> Guardar</button></div>
        </form>
      </div>
    </div>
  )
}
function Field({ label, value, onChange, type = 'text', required }) { return <label className="space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">{label}</span><input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary" /></label> }
