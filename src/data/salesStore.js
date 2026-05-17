/**
 * salesStore.js
 * Almacenamiento mock de ventas/pedidos.
 */

let nextSaleId = 100;
let _sales = [];

export const createSale = (saleData) => {
  const newSale = {
    id: `#${nextSaleId++}`,
    timestamp: new Date().toISOString(),
    status: 'pagado',
    ...saleData
  };
  _sales = [newSale, ..._sales];
  return newSale;
};

export const getSalesHistory = () => [..._sales];

export const getSaleById = (id) => _sales.find(s => s.id === id) ?? null;
