import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2, Users } from 'lucide-react'
import { deleteEmployee, getEmployees } from '../../../../data/employeesStore'

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState(() => getEmployees())
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => employees.filter((e) =>
    `${e.name} ${e.email} ${e.position}`.toLowerCase().includes(search.toLowerCase())
  ), [employees, search])

  const handleDelete = (id) => {
    if (!confirm('¿Eliminar empleado?')) return
    deleteEmployee(id)
    setEmployees(getEmployees())
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto text-text">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-muted">Administración</p>
          <h1 className="text-2xl font-bold">Empleados</h1>
        </div>
        <Link to="/empleados/nuevo" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/10">
          <Plus size={16} /> Nuevo empleado
        </Link>
      </div>

      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar empleado..." className="w-full pl-10 pr-4 py-3 rounded-2xl border border-muted/20 bg-card outline-none focus:border-primary" />
      </div>

      <div className="bg-card rounded-2xl shadow-sm overflow-hidden border border-muted/10">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted bg-background">
          <span className="col-span-4">Empleado</span><span className="col-span-2">Rol</span><span className="col-span-2">Turno</span><span className="col-span-2">Estado</span><span className="col-span-2 text-right">Acciones</span>
        </div>
        {filtered.map((e) => (
          <div key={e.id} className="grid md:grid-cols-12 gap-3 px-5 py-4 border-t border-muted/10 items-center">
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Users size={18} /></div>
              <div><p className="font-bold">{e.name}</p><p className="text-xs text-muted">{e.email} · {e.phone}</p></div>
            </div>
            <p className="md:col-span-2 text-sm">{e.role === 'admin' ? 'Administrador' : 'Cajero'}</p>
            <p className="md:col-span-2 text-sm text-muted">{e.shift}</p>
            <p className="md:col-span-2"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${e.active ? 'bg-success/10 text-success' : 'bg-muted/10 text-muted'}`}>{e.active ? 'Activo' : 'Inactivo'}</span></p>
            <div className="md:col-span-2 flex md:justify-end gap-2">
              <Link to={`/empleados/${e.id}`} className="p-2 rounded-lg hover:bg-background text-muted hover:text-primary"><Pencil size={16} /></Link>
              <button onClick={() => handleDelete(e.id)} className="p-2 rounded-lg hover:bg-error/10 text-muted hover:text-error"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
