/**
 * productsStore.js
 * Mock store en memoria — reemplazar por llamadas reales a la API cuando esté listo.
 * Al ser un módulo ES, la variable persiste durante toda la sesión de la SPA.
 */

export const CATEGORIES = [
  'Platos principales',
  'Bebidas',
  'Entradas',
  'Postres',
  'Acompañamientos',
  'Ingredientes',
]

let nextId = 13

let _products = [
  { id: 1,  name: 'Tacos de Barbacoa',    category: 'Platos principales', price: 85,  stock: 30, active: true,  description: 'Tacos de barbacoa estilo tradicional con cilantro y cebolla.' },
  { id: 2,  name: 'Quesadillas de Pollo', category: 'Platos principales', price: 65,  stock: 25, active: true,  description: 'Quesadillas rellenas de pollo asado con queso Oaxaca.' },
  { id: 3,  name: 'Enchiladas Verdes',    category: 'Platos principales', price: 75,  stock: 15, active: true,  description: 'Enchiladas bañadas en salsa verde con pollo deshebrado.' },
  { id: 4,  name: 'Agua de Jamaica',      category: 'Bebidas',            price: 25,  stock: 4,  active: true,  description: '' },
  { id: 5,  name: 'Refresco',             category: 'Bebidas',            price: 20,  stock: 50, active: true,  description: '' },
  { id: 6,  name: 'Cerveza Artesanal',    category: 'Bebidas',            price: 55,  stock: 0,  active: true,  description: 'Cerveza artesanal local, variedad rubia.' },
  { id: 7,  name: 'Guacamole',            category: 'Entradas',           price: 45,  stock: 20, active: true,  description: 'Guacamole fresco preparado al momento.' },
  { id: 8,  name: 'Nachos con Queso',     category: 'Entradas',           price: 55,  stock: 3,  active: true,  description: '' },
  { id: 9,  name: 'Flan de Cajeta',       category: 'Postres',            price: 35,  stock: 12, active: true,  description: 'Flan casero con cajeta de Celaya.' },
  { id: 10, name: 'Churros con Cajeta',   category: 'Postres',            price: 30,  stock: 18, active: false, description: '' },
  { id: 11, name: 'Arroz Mexicano',       category: 'Acompañamientos',    price: 15,  stock: 45, active: true,  description: '' },
  { id: 12, name: 'Frijoles de Olla',     category: 'Acompañamientos',    price: 15,  stock: 2,  active: true,  description: '' },
]

export const getProducts     = ()   => [..._products]
export const getProductById  = (id) => _products.find((p) => p.id === Number(id)) ?? null

export const createProduct = (data) => {
  const product = { id: nextId++, ...data }
  _products = [..._products, product]
  return product
}

export const updateProduct = (id, data) => {
  _products = _products.map((p) => p.id === Number(id) ? { ...p, ...data } : p)
  return _products.find((p) => p.id === Number(id))
}

export const deleteProduct = (id) => {
  _products = _products.filter((p) => p.id !== Number(id))
}
