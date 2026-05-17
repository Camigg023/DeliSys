import { useState } from 'react'
import { CalendarDays, Save } from 'lucide-react'
import { getEmployees, updateEmployeeSchedule, WEEK_DAYS } from '../../../../data/employeesStore'

const clone = (value) => JSON.parse(JSON.stringify(value))

export default function SchedulePage() {
  const [employees, setEmployees] = useState(() => getEmployees())
  const [editingId, setEditingId] = useState(null)
  const [draftSchedule, setDraftSchedule] = useState(null)

  const startEdit = (employee) => {
    setEditingId(employee.id)
    setDraftSchedule(clone(employee.schedule))
  }

  const setDay = (day, field, value) => {
    setDraftSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }

  const saveSchedule = () => {
    updateEmployeeSchedule(editingId, draftSchedule)
    setEmployees(getEmployees())
    setEditingId(null)
    setDraftSchedule(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraftSchedule(null)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto text-text">
      <div className="mb-6">
        <p className="text-sm text-muted">Organización</p>
        <h1 className="text-2xl font-bold">Horarios</h1>
        <p className="text-sm text-muted mt-1">El administrador puede modificar todos los días y horas de cada empleada.</p>
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        {employees.map((employee) => {
          const isEditing = editingId === employee.id
          const schedule = isEditing ? draftSchedule : employee.schedule
          return (
            <div key={employee.id} className="bg-card rounded-2xl border border-muted/10 shadow-sm overflow-hidden">
              <div className="p-5 bg-background border-b border-muted/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><CalendarDays size={20} /></div>
                  <div>
                    <h2 className="font-bold">{employee.name}</h2>
                    <p className="text-sm text-muted">{employee.position} · {employee.active ? 'Activo' : 'Inactivo'}</p>
                  </div>
                </div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <button onClick={cancelEdit} className="px-3 py-2 rounded-xl text-muted hover:bg-card text-sm font-semibold">Cancelar</button>
                    <button onClick={saveSchedule} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white text-sm font-bold"><Save size={15} /> Guardar</button>
                  </div>
                ) : (
                  <button onClick={() => startEdit(employee)} className="px-3 py-2 rounded-xl bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20">Modificar horario</button>
                )}
              </div>

              <div className="divide-y divide-muted/10">
                {WEEK_DAYS.map((day) => {
                  const item = schedule[day]
                  return (
                    <div key={day} className="grid sm:grid-cols-12 gap-3 p-4 items-center">
                      <label className="sm:col-span-4 flex items-center gap-3 font-semibold text-sm">
                        <input type="checkbox" disabled={!isEditing} checked={item.enabled} onChange={(e) => setDay(day, 'enabled', e.target.checked)} />
                        {day}
                      </label>
                      <div className="sm:col-span-8 grid grid-cols-2 gap-3">
                        <input aria-label={`Entrada ${day}`} type="time" disabled={!isEditing || !item.enabled} value={item.start} onChange={(e) => setDay(day, 'start', e.target.value)} className="px-3 py-2 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary disabled:opacity-50" />
                        <input aria-label={`Salida ${day}`} type="time" disabled={!isEditing || !item.enabled} value={item.end} onChange={(e) => setDay(day, 'end', e.target.value)} className="px-3 py-2 rounded-xl border border-muted/20 bg-background outline-none focus:border-primary disabled:opacity-50" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
