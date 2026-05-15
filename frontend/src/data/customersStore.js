/**
 * customersStore.js
 * Almacenamiento mock de clientes.
 */

let nextId = 5;

let _customers = [
  { 
    id: 1, 
    name: 'Juan Pérez', 
    phone: '555-0101', 
    email: 'juan.perez@email.com', 
    address: 'Av. Reforma 123, Ciudad de México',
    points: 120,
    lastPurchase: '2024-05-10',
    notes: 'Cliente frecuente, prefiere entrega por la tarde.'
  },
  { 
    id: 2, 
    name: 'María García', 
    phone: '555-0202', 
    email: 'm.garcia@email.com', 
    address: 'Calle Juárez 45, Guadalajara',
    points: 450,
    lastPurchase: '2024-05-14',
    notes: 'Alergia a las nueces.'
  },
  { 
    id: 3, 
    name: 'Roberto Smith', 
    phone: '555-0303', 
    email: 'rsmith@email.com', 
    address: 'Blvd. Kukulcán km 12, Cancún',
    points: 0,
    lastPurchase: '2024-04-20',
    notes: ''
  },
  { 
    id: 4, 
    name: 'Elena Rodríguez', 
    phone: '555-0404', 
    email: 'elena.rod@email.com', 
    address: 'Col. Roma Norte, Querétaro',
    points: 85,
    lastPurchase: '2024-05-12',
    notes: 'Facturar siempre.'
  },
];

export const getCustomers = () => [..._customers];

export const getCustomerById = (id) => _customers.find(c => c.id === Number(id)) ?? null;

export const createCustomer = (data) => {
  const customer = { 
    id: nextId++, 
    points: 0, 
    lastPurchase: null, 
    ...data 
  };
  _customers = [..._customers, customer];
  return customer;
};

export const updateCustomer = (id, data) => {
  _customers = _customers.map(c => c.id === Number(id) ? { ...c, ...data } : c);
  return _customers.find(c => c.id === Number(id));
};

export const deleteCustomer = (id) => {
  _customers = _customers.filter(c => c.id !== Number(id));
};
