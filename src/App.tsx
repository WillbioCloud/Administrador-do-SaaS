// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Clients from "./pages/Clients"
import Plans from "./pages/Plans"
import Payments from "./pages/Payments"
import Contracts from "./pages/Contracts"
import Settings from "./pages/Settings"
import Support from "./pages/Support"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Protegidas (Só acessa se o ProtectedRoute permitir) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="plans" element={<Plans />} />
            <Route path="payments" element={<Payments />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}