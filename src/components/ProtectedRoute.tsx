// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
  // Por enquanto, vamos simular a autenticação. 
  // Mais tarde, trocaremos isso pela verificação real do Supabase.
  const isAuthenticated = true; // Mude para 'false' para testar o bloqueio

  if (!isAuthenticated) {
    // Se não estiver logado, redireciona para o login
    return <Navigate to="/login" replace />
  }

  // Se estiver logado, renderiza a rota filha (o MainLayout)
  return <Outlet />
}