import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './routes/PrivateRoute'
import RoleRoute from './routes/RoleRoute'
import MainLayout from './layouts/MainLayout'

import LoginPage from './features/login/presentation/pages/LoginPage'
import DashboardPage from './features/dashboard/presentation/pages/DashboardPage'
import EmployeeListPage from './features/employee/presentation/pages/EmployeeListPage'
import EmployeeFormPage from './features/employee/presentation/pages/EmployeeFormPage'
import ProductListPage from './features/product/presentation/pages/ProductListPage'
import ProductFormPage from './features/product/presentation/pages/ProductFormPage'
import CustomerListPage from './features/customer/presentation/pages/CustomerListPage'
import CustomerFormPage from './features/customer/presentation/pages/CustomerFormPage'
import NewSalePage from './features/sales/presentation/pages/NewSalePage'
import SalesHistoryPage from './features/sales/presentation/pages/SalesHistoryPage'
import InvoiceViewPage from './features/sales/presentation/pages/InvoiceViewPage'
import ExpiryAlertsPage from './features/traceability/presentation/pages/ExpiryAlertsPage'
import SchedulePage from './features/schedule/presentation/pages/SchedulePage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />

              <Route element={<RoleRoute allowedRoles={['admin']} />}>
                <Route path="/empleados" element={<EmployeeListPage />} />
                <Route path="/empleados/nuevo" element={<EmployeeFormPage />} />
                <Route path="/empleados/:id" element={<EmployeeFormPage />} />
                <Route path="/productos" element={<ProductListPage />} />
                <Route path="/productos/nuevo" element={<ProductFormPage />} />
                <Route path="/productos/:id" element={<ProductFormPage />} />
                <Route path="/alertas-vencimiento" element={<ExpiryAlertsPage />} />
                <Route path="/horarios" element={<SchedulePage />} />
              </Route>

              <Route element={<RoleRoute allowedRoles={['cashier']} />}>
                <Route path="/ventas/nueva" element={<NewSalePage />} />
                <Route path="/clientes" element={<CustomerListPage />} />
                <Route path="/clientes/nuevo" element={<CustomerFormPage />} />
                <Route path="/clientes/:id" element={<CustomerFormPage />} />
              </Route>

              <Route path="/ventas/historial" element={<SalesHistoryPage />} />
              <Route path="/ventas/factura/:id" element={<InvoiceViewPage />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
