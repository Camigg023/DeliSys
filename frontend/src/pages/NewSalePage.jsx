import { useState, useMemo } from 'react'
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  ShoppingCart, 
  ChevronRight, 
  X,
  CheckCircle2,
  Package
} from 'lucide-react'
import { getProducts, CATEGORIES } from '../data/productsStore'
import { getCustomers } from '../data/customersStore'
import { createSale } from '../data/salesStore'

export default function NewSalePage() {
  // Estados
  const [products] = useState(() => getProducts())
  const [customers] = useState(() => getCustomers())
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('Todos')
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCat = catFilter === 'Todos' || p.category === catFilter
      return matchSearch && matchCat && p.active
    })
  }, [products, search, catFilter])

  // Cálculos del carrito
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = subtotal * 0.16
  const total = subtotal + tax

  // Acciones del carrito
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const handleConfirmSale = () => {
    if (cart.length === 0) return
    
    const customer = customers.find(c => c.id === Number(selectedCustomerId))
    
    createSale({
      customerName: customer ? customer.name : 'Venta General',
      customerId: selectedCustomerId || null,
      items: cart,
      subtotal,
      tax,
      total
    })

    setIsSuccess(true)
    setCart([])
    setSelectedCustomerId('')
    setTimeout(() => setIsSuccess(false), 3000)
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
      
      {/* ── COLUMNA IZQUIERDA: CATÁLOGO ── */}
      <div className="flex-1 flex flex-col border-r border-muted/10 bg-background/50">
        
        {/* Header Catálogo */}
        <div className="p-6 border-b border-muted/10 bg-card">
          <h1 className="text-xl font-bold text-text mb-4">Menú de Productos</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-muted/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <select 
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm border border-muted/20 bg-card outline-none focus:border-primary cursor-pointer"
            >
              <option value="Todos">Todas las categorías</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Grid Productos */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="group flex flex-col text-left bg-card p-3 rounded-2xl border border-muted/10 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/5 active:scale-95"
              >
                <div className="w-full aspect-square rounded-xl bg-background mb-3 flex items-center justify-center text-primary/30 group-hover:text-primary/50 transition-colors">
                  <Package size={32} />
                </div>
                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">{product.category}</p>
                <p className="font-bold text-text text-sm mb-2 line-clamp-2 flex-1">{product.name}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-primary font-bold">${product.price}</span>
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Plus size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-muted py-20">
              <Search size={40} className="mb-4 opacity-20" />
              <p>No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>

      {/* ── COLUMNA DERECHA: CARRITO ── */}
      <div className="w-full lg:w-[400px] flex flex-col bg-card shadow-2xl relative z-10">
        
        {/* Header Carrito */}
        <div className="p-6 border-b border-muted/10">
          <div className="flex items-center gap-2 text-primary mb-4">
            <ShoppingCart size={20} />
            <h2 className="font-bold text-lg">Resumen de Venta</h2>
          </div>

          {/* Selector Cliente */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5">
              <User size={12} /> Cliente (Opcional)
            </label>
            <select 
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm border border-muted/10 bg-background outline-none focus:border-primary cursor-pointer"
            >
              <option value="">Consumidor Final / General</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista del Carrito */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted opacity-40 py-20">
              <ShoppingCart size={48} className="mb-4" />
              <p className="text-sm font-medium">El carrito está vacío</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center shrink-0">
                  <Package size={20} className="text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text truncate">{item.name}</p>
                  <p className="text-xs text-primary font-bold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 rounded-md hover:bg-card text-muted hover:text-text transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 rounded-md hover:bg-card text-muted hover:text-text transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-muted hover:text-error transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Totales */}
        <div className="p-6 bg-background border-t border-muted/10 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted">
              <span>IVA (16%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-text pt-2 border-t border-muted/10">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleConfirmSale}
            disabled={cart.length === 0}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/10
              ${cart.length > 0 
                ? 'bg-primary text-white hover:bg-primary/90 active:scale-95' 
                : 'bg-muted/20 text-muted cursor-not-allowed'}
            `}
          >
            Confirmar Venta
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* MODAL / FEEDBACK ÉXITO */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm">
          <div className="bg-card rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl max-w-sm w-full animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">¡Venta Exitosa!</h3>
            <p className="text-muted text-sm mb-8">El pedido ha sido registrado correctamente en el sistema.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="w-full py-3 bg-text text-white rounded-xl font-bold hover:bg-text/90 transition-colors"
            >
              Nueva Venta
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
