import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Save, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  AlertCircle
} from 'lucide-react'
import { getCustomerById, createCustomer, updateCustomer } from '../../../../data/customersStore'

export default function CustomerFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const currentCustomer = useMemo(() => isEdit ? getCustomerById(id) : null, [id, isEdit])

  const [formData, setFormData] = useState(() => currentCustomer ? {
    name: currentCustomer.name,
    phone: currentCustomer.phone,
    email: currentCustomer.email,
    address: currentCustomer.address,
    notes: currentCustomer.notes || ''
  } : {
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isEdit && !currentCustomer) navigate('/clientes')
  }, [currentCustomer, isEdit, navigate])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    
    // Simular latencia de red para UX
    setTimeout(() => {
      if (isEdit) {
        updateCustomer(id, formData)
      } else {
        createCustomer(formData)
      }
      setIsSubmitting(false)
      navigate('/clientes')
    }, 600)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      
      {/* ── Botón Volver ── */}
      <button
        onClick={() => navigate('/clientes')}
        className="flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors mb-6 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Volver al listado
      </button>

      {/* ── Título ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">
          {isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}
        </h1>
        <p className="text-sm text-muted mt-1">
          {isEdit ? 'Actualiza la información del cliente en el sistema.' : 'Registra un nuevo cliente para el servicio de DeliSys.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-muted/10 space-y-5">
          
          {/* Nombre */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-2">
              <User size={13} className="text-primary" />
              Nombre Completo
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-background border-1.5 transition-all
                ${errors.name ? 'border-error ring-4 ring-error/10' : 'border-muted/10 focus:border-primary focus:ring-4 focus:ring-primary/10'}
              `}
            />
            {errors.name && (
              <p className="text-[11px] text-error font-medium flex items-center gap-1">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Fila: Teléfono y Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-2">
                <Phone size={13} className="text-secondary" />
                Teléfono
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ej. 555-0101"
                className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-background border-1.5 transition-all
                  ${errors.phone ? 'border-error ring-4 ring-error/10' : 'border-muted/10 focus:border-primary focus:ring-4 focus:ring-primary/10'}
                `}
              />
              {errors.phone && (
                <p className="text-[11px] text-error font-medium flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-2">
                <Mail size={13} className="text-success" />
                Email (Opcional)
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="cliente@ejemplo.com"
                className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-background border-1.5 transition-all
                  ${errors.email ? 'border-error ring-4 ring-error/10' : 'border-muted/10 focus:border-primary focus:ring-4 focus:ring-primary/10'}
                `}
              />
              {errors.email && (
                <p className="text-[11px] text-error font-medium flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-2">
              <MapPin size={13} className="text-sidebar" />
              Dirección de Entrega
            </label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Calle, Número, Colonia, Ciudad..."
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-background border-1.5 border-muted/10 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Notas */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-2">
              <FileText size={13} className="text-muted" />
              Notas Adicionales
            </label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Preferencias, alergias, referencias de ubicación..."
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-background border-1.5 border-muted/10 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/clientes')}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-muted hover:bg-muted/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold text-white transition-all
              ${isSubmitting ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'}
            `}
          >
            <Save size={18} />
            {isSubmitting ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Registrar Cliente')}
          </button>
        </div>
      </form>

      <div className="h-10" />
    </div>
  )
}
