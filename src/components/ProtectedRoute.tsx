import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // 1. Checa se já existe uma sessão ativa ao carregar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
    })

    // 2. Fica escutando mudanças (ex: se o usuário deslogar em outra aba)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Enquanto o Supabase pensa, mostra uma telinha preta para não piscar
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  // Se não tem sessão, expulsa para o Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Se estiver logado, libera o acesso ao MainLayout
  return <Outlet />
}