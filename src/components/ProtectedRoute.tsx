import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setIsAuthenticated(false)
        return
      }

      // Segurança Extra: Verifica se a sessão ativa realmente é da Matriz
      const { data: profile } = await supabase
        .from('profiles')
        .select('companies(slug)')
        .eq('id', session.user.id)
        .single()

      // @ts-ignore
      if (profile?.companies?.slug === 'hub-saas') {
        setIsAuthenticated(true)
      } else {
        // É um usuário normal tentando acessar via URL direta
        await supabase.auth.signOut()
        setIsAuthenticated(false)
      }
    }

    checkAccess()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        checkAccess() // Re-valida caso a sessão mude
      } else {
        setIsAuthenticated(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
