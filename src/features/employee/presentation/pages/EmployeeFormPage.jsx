import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { createEmployee, DEFAULT_SCHEDULE, getEmployeeById, ROLES, SHIFTS, updateEmployee, WEEK_DAYS } from '../../../../data/employeesStore'

const cloneSchedule = (schedule) => JSON.parse(JSON.stringify(schedule ?? DEFAULT_SCHEDULE))

export default function EmployeeFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = Boolean(id)
  const current = useMemo(() => editing ? getEmployeeById(id) : null, [editing, id])
  const [form, setForm] = useState(() => current ?? { name: '', email: '', phone: '', role: 'cashier', position: 'Cajero', shift: 'Mañana', active: true, schedule: cloneSchedule(DEFAULT_SCHEDULE) })

  const setScheduleDay = (day, field, value) => {
    setForm((prev) => ({
      ...prev,
      schedule: {
        ...cloneSchedule(prev.schedule),
        [day]: { ...cloneSchedule(prev.schedule)[day], [field]: value },
      },
      shift: 'Personalizado',
    }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (editing) updateEmployee(id, form)
    else createEmployee(form)
    navigate('/empleados')
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto text-text">
      <button onClick={() => navigate('/empleados')} className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6"><ArrowLeft size={16} /> Volver</button>
      <div className="bg-card rounded-3xl p-6 shadow-sm border border-muted/10">
        <h1 className="text-2xl font-bold mb-1">{editing ? 'Editar empleado' : 'Nuevo empleado'}</h1>
        <p className="text-sm text-muted mb-6">Define datos básicos, rol, días y horario de trabajo.</p>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Field label="Teléfono" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
          <Field label="Correo" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <Field label="Cargo" value={form.position} onChange={(v) => setForm({ ...form, position: v })} required />
          <Select label="Rol" value={form.role} onChange={(v) => setForm({ ...form, role: v })} options={ROLES} />
          <Select label="Turno base" value={form.shift} onChange={(v) => setForm({ ...form, shift: v })} options={SHIFTS.map(s => ({ value: s, label: s }))} />

          <div className="sm:col-span-2 rounded-2xl border border-muted/10 overflow-hidden">
            <div className="px-4 py-3 bg-background border-b border-muted/10">
              <h2 className="font-bold">Días y horario de trabajo</h2>
              <p className="text-xs text-muted">Activa los días laborales y ajusta hora de entrada y salida.</p>
            </div>
            <div className="divide-y divide-muted/10">
              {WEEK_DAYS.map((day) => {
                const daySchedule = cloneSchedule(form.schedule)[day]
                return (
                  <div key={day} className="grid sm:grid-cols-12 gap-3 p-4 items-center">
                    <label className="sm:col-span-4 flex items-center gap-3 text-sm font-semibold">
                      <input type="checkbox" checked={daySchedule.enabled} onChange={(e) => setScheduleDay(day, 'enabled', e.target.checked)} />
                      {day}
                    </label>
                    <label className="sm:col-span-4 text-xs font-bold uppercase tracking-wider text-muted">
                      Entrada
                      <input type="time" value={daySchedule.start} disabled={!daySchedule.enabled} onChange={(e) => setScheduleDay(day, 'start', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary disabled:opacity-40" />
                    </label>
                    <label className="sm:col-span-4 text-xs font-bold uppercase tracking-wider text-muted">
                      Salida
                      <input type="time" value={daySchedule.end} disabled={!daySchedule.enabled} onChange={(e) => setScheduleDay(day, 'end', e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary disabled:opacity-40" />
                    </label>
                  </div>
                )
              })}
            </div>
          </div>

          <label className="sm:col-span-2 flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Empleado activo</label>
          <div className="sm:col-span-2 flex justify-end gap-3 pt-3">
            <button type="button" onClick={() => navigate('/empleados')} className="px-5 py-2.5 rounded-xl text-muted hover:bg-background">Cancelar</button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold"><Save size={16} /> Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required }) {
  return <label className="space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">{label}</span><input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary" /></label>
}
function Select({ label, value, onChange, options }) {
  return <label className="space-y-1.5"><span className="text-xs font-bold uppercase tracking-wider text-muted">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary">{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
}
