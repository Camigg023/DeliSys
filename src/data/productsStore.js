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

const img = (name) => `/product-images/${name}.svg`

let nextId = 25

let _products = [
  { id: 1,  name: 'Tacos de Barbacoa',       category: 'Platos principales', price: 85,  stock: 30, active: true,  imageUrl: img('tacos-barbacoa'),       expiryDate: '2026-06-12', description: 'Tacos de barbacoa estilo tradicional con cilantro y cebolla.' },
  { id: 2,  name: 'Quesadillas de Pollo',    category: 'Platos principales', price: 65,  stock: 25, active: true,  imageUrl: img('quesadillas-pollo'),    expiryDate: '2026-06-10', description: 'Quesadillas rellenas de pollo asado con queso Oaxaca.' },
  { id: 3,  name: 'Enchiladas Verdes',       category: 'Platos principales', price: 75,  stock: 15, active: true,  imageUrl: img('enchiladas-verdes'),    expiryDate: '2026-06-09', description: 'Enchiladas bañadas en salsa verde con pollo deshebrado.' },
  { id: 4,  name: 'Agua de Jamaica',         category: 'Bebidas',            price: 25,  stock: 4,  active: true,  imageUrl: img('agua-jamaica'),         expiryDate: '2026-05-20', description: 'Bebida natural de flor de jamaica.' },
  { id: 5,  name: 'Refresco',                category: 'Bebidas',            price: 20,  stock: 50, active: true,  imageUrl: img('refresco'),             expiryDate: '2026-10-30', description: 'Refresco frío en presentación individual.' },
  { id: 6,  name: 'Cerveza Artesanal',       category: 'Bebidas',            price: 55,  stock: 0,  active: true,  imageUrl: img('cerveza-artesanal'),    expiryDate: '2026-08-15', description: 'Cerveza artesanal local, variedad rubia.' },
  { id: 7,  name: 'Guacamole',               category: 'Entradas',           price: 45,  stock: 20, active: true,  imageUrl: img('guacamole'),            expiryDate: '2026-05-17', description: 'Guacamole fresco preparado al momento.' },
  { id: 8,  name: 'Nachos con Queso',        category: 'Entradas',           price: 55,  stock: 3,  active: true,  imageUrl: img('nachos-queso'),         expiryDate: '2026-05-18', description: 'Nachos crujientes con queso fundido y jalapeños.' },
  { id: 9,  name: 'Flan de Cajeta',          category: 'Postres',            price: 35,  stock: 12, active: true,  imageUrl: img('flan-cajeta'),          expiryDate: '2026-05-21', description: 'Flan casero con cajeta de Celaya.' },
  { id: 10, name: 'Churros con Cajeta',      category: 'Postres',            price: 30,  stock: 18, active: false, imageUrl: img('churros-cajeta'),       expiryDate: '2026-05-22', description: 'Churros recién hechos con cajeta.' },
  { id: 11, name: 'Arroz Mexicano',          category: 'Acompañamientos',    price: 15,  stock: 45, active: true,  imageUrl: img('arroz-mexicano'),       expiryDate: '2026-05-19', description: 'Arroz rojo tradicional.' },
  { id: 12, name: 'Frijoles de Olla',        category: 'Acompañamientos',    price: 15,  stock: 2,  active: true,  imageUrl: img('frijoles-olla'),        expiryDate: '2026-05-18', description: 'Frijoles cocidos lentamente en olla.' },
  { id: 13, name: 'Hamburguesa de la Casa',  category: 'Platos principales', price: 95,  stock: 22, active: true,  imageUrl: img('hamburguesa-casa'),     expiryDate: '2026-06-08', description: 'Hamburguesa artesanal con queso, vegetales y salsa de la casa.' },
  { id: 14, name: 'Pasta Alfredo',           category: 'Platos principales', price: 88,  stock: 14, active: true,  imageUrl: img('pasta-alfredo'),        expiryDate: '2026-06-07', description: 'Pasta cremosa con parmesano y pollo.' },
  { id: 15, name: 'Ensalada Fresca',         category: 'Entradas',           price: 48,  stock: 17, active: true,  imageUrl: img('ensalada-fresca'),      expiryDate: '2026-05-17', description: 'Lechuga, tomate, pepino y vinagreta de la casa.' },
  { id: 16, name: 'Sopa de Tortilla',        category: 'Entradas',           price: 42,  stock: 9,  active: true,  imageUrl: img('sopa-tortilla'),        expiryDate: '2026-05-18', description: 'Sopa caliente con tiras de tortilla, aguacate y queso.' },
  { id: 17, name: 'Limonada Natural',        category: 'Bebidas',            price: 24,  stock: 28, active: true,  imageUrl: img('limonada-natural'),     expiryDate: '2026-05-19', description: 'Limonada fresca preparada al momento.' },
  { id: 18, name: 'Café de Olla',            category: 'Bebidas',            price: 18,  stock: 35, active: true,  imageUrl: img('cafe-olla'),            expiryDate: '2026-09-30', description: 'Café tradicional con canela y piloncillo.' },
  { id: 19, name: 'Pastel de Chocolate',     category: 'Postres',            price: 45,  stock: 7,  active: true,  imageUrl: img('pastel-chocolate'),     expiryDate: '2026-05-20', description: 'Rebanada de pastel húmedo de chocolate.' },
  { id: 20, name: 'Helado de Vainilla',      category: 'Postres',            price: 28,  stock: 6,  active: true,  imageUrl: img('helado-vainilla'),      expiryDate: '2026-07-01', description: 'Helado cremoso de vainilla.' },
  { id: 21, name: 'Papas Gajo',              category: 'Acompañamientos',    price: 32,  stock: 11, active: true,  imageUrl: img('papas-gajo'),           expiryDate: '2026-05-24', description: 'Papas sazonadas y doradas.' },
  { id: 22, name: 'Puré de Papa',            category: 'Acompañamientos',    price: 25,  stock: 5,  active: true,  imageUrl: img('pure-papa'),            expiryDate: '2026-05-19', description: 'Puré cremoso de papa con mantequilla.' },
  { id: 23, name: 'Pollo Fresco',            category: 'Ingredientes',       price: 0,   stock: 8,  active: true,  imageUrl: img('pollo'),                expiryDate: '2026-05-17', description: 'Ingrediente base para preparaciones de cocina.' },
  { id: 24, name: 'Queso Oaxaca',            category: 'Ingredientes',       price: 0,   stock: 4,  active: true,  imageUrl: img('queso-oaxaca'),         expiryDate: '2026-05-18', description: 'Ingrediente lácteo para quesadillas y gratinados.' },
]

export const getProducts     = ()   => [..._products]
export const getProductById  = (id) => _products.find((p) => p.id === Number(id)) ?? null

export const createProduct = (data) => {
  const product = { id: nextId++, imageUrl: '', expiryDate: '', ...data }
  _products = [..._products, product]
  return product
}

export const updateProduct = (id, data) => {
  _products = _products.map((p) => p.id === Number(id) ? { ...p, ...data } : p)
  return _products.find((p) => p.id === Number(id))
}

export const markProductUnavailable = (id) => {
  _products = _products.map((p) => p.id === Number(id) ? { ...p, active: false, stock: 0 } : p)
  return _products.find((p) => p.id === Number(id))
}

export const deleteProduct = (id) => {
  _products = _products.filter((p) => p.id !== Number(id))
}
