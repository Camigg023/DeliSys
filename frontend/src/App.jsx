import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute    from './routes/PrivateRoute'
import MainLayout      from './layouts/MainLayout'

import LoginPage     from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

import EmployeeListPage  from './pages/EmployeeListPage'
import EmployeeFormPage  from './pages/EmployeeFormPage'
import ProductListPage   from './pages/ProductListPage'
import ProductFormPage   from './pages/ProductFormPage'
import CustomerListPage  from './pages/CustomerListPage'
import CustomerFormPage  from './pages/CustomerFormPage'
import NewSalePage       from './pages/NewSalePage'
import SalesHistoryPage  from './pages/SalesHistoryPage'
import InvoiceViewPage   from './pages/InvoiceViewPage'
import ExpiryAlertsPage  from './pages/ExpiryAlertsPage'
import SchedulePage      from './pages/SchedulePage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas con layout compartido */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard"           element={<DashboardPage />} />
              <Route path="/empleados"            element={<EmployeeListPage />} />
              <Route path="/empleados/nuevo"      element={<EmployeeFormPage />} />
              <Route path="/empleados/:id"        element={<EmployeeFormPage />} />
              <Route path="/productos"            element={<ProductListPage />} />
              <Route path="/productos/nuevo"      element={<ProductFormPage />} />
              <Route path="/productos/:id"        element={<ProductFormPage />} />
              <Route path="/clientes"             element={<CustomerListPage />} />
              <Route path="/clientes/nuevo"       element={<CustomerFormPage />} />
              <Route path="/clientes/:id"         element={<CustomerFormPage />} />
              <Route path="/ventas/nueva"         element={<NewSalePage />} />
              <Route path="/ventas/historial"     element={<SalesHistoryPage />} />
              <Route path="/ventas/factura/:id"   element={<InvoiceViewPage />} />
              <Route path="/alertas-vencimiento"  element={<ExpiryAlertsPage />} />
              <Route path="/horarios"             element={<SchedulePage />} />
            </Route>
          </Route>

          {/* Redirects */}
          <Route path="/"  element={<Navigate to="/login" replace />} />
          <Route path="*"  element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
