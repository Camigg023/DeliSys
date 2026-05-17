let nextId = 5

export const WEEK_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export const DEFAULT_SCHEDULE = {
  Lunes: { enabled: true, start: '08:00', end: '16:00' },
  Martes: { enabled: true, start: '08:00', end: '16:00' },
  Miércoles: { enabled: true, start: '08:00', end: '16:00' },
  Jueves: { enabled: true, start: '08:00', end: '16:00' },
  Viernes: { enabled: true, start: '08:00', end: '16:00' },
  Sábado: { enabled: false, start: '09:00', end: '14:00' },
  Domingo: { enabled: false, start: '09:00', end: '14:00' },
}

const buildSchedule = (days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], start = '08:00', end = '16:00') =>
  WEEK_DAYS.reduce((acc, day) => {
    acc[day] = { enabled: days.includes(day), start, end }
    return acc
  }, {})

let _employees = [
  { id: 1, name: 'Admin General', email: 'admin@delisys.com', phone: '555-1001', role: 'admin', position: 'Administrador', shift: 'Mañana', active: true, schedule: buildSchedule(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], '08:00', '16:00') },
  { id: 2, name: 'Cajero Principal', email: 'cajero@delisys.com', phone: '555-1002', role: 'cashier', position: 'Cajero', shift: 'Tarde', active: true, schedule: buildSchedule(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Sábado'], '14:00', '22:00') },
  { id: 3, name: 'Laura Méndez', email: 'laura@delisys.com', phone: '555-1003', role: 'cashier', position: 'Cajera', shift: 'Mañana', active: true, schedule: buildSchedule(['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], '07:00', '15:00') },
  { id: 4, name: 'Carlos Rojas', email: 'carlos@delisys.com', phone: '555-1004', role: 'cashier', position: 'Auxiliar', shift: 'Noche', active: false, schedule: buildSchedule(['Viernes', 'Sábado', 'Domingo'], '16:00', '23:00') },
]

export const ROLES = [
  { value: 'admin', label: 'Administrador' },
  { value: 'cashier', label: 'Cajero' },
]

export const SHIFTS = ['Mañana', 'Tarde', 'Noche', 'Personalizado']

const normalizeEmployee = (employee) => employee ? ({
  ...employee,
  schedule: employee.schedule ?? DEFAULT_SCHEDULE,
}) : null

export const getEmployees = () => _employees.map(normalizeEmployee)
export const getEmployeeById = (id) => normalizeEmployee(_employees.find((e) => e.id === Number(id)) ?? null)

export const createEmployee = (data) => {
  const employee = normalizeEmployee({ id: nextId++, active: true, schedule: DEFAULT_SCHEDULE, ...data })
  _employees = [employee, ..._employees]
  return employee
}

export const updateEmployee = (id, data) => {
  _employees = _employees.map((e) => e.id === Number(id) ? normalizeEmployee({ ...e, ...data }) : e)
  return getEmployeeById(id)
}

export const updateEmployeeSchedule = (id, schedule) => updateEmployee(id, { schedule, shift: 'Personalizado' })

export const deleteEmployee = (id) => {
  _employees = _employees.filter((e) => e.id !== Number(id))
}
