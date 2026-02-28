import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Building2, Lock, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg("")
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg("Credenciais inválidas. Verifique seu e-mail e senha.")
      setIsLoading(false)
      return
    }

    // VERIFICAÇÃO VIP: Checa se o usuário logado pertence à "Matriz - Hub SaaS"
    const { data: profile } = await supabase
      .from('profiles')
      .select('companies(slug)')
      .eq('id', data.user.id)
      .single()

    // @ts-ignore - Ignorando o erro de tipagem de junção do supabase
    if (profile?.companies?.slug !== 'hub-saas') {
      await supabase.auth.signOut() // Desloga o penetra imediatamente
      setErrorMsg("Acesso negado. Esta área é restrita aos administradores do Hub SaaS.")
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 text-white p-3 rounded-xl mb-4 shadow-lg shadow-indigo-500/20">
            <Building2 className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">ArkCoder Admin</h1>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Acesso restrito ao Super Administrador</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 dark:text-slate-400" />
              <Input
                type="email"
                placeholder="admin@arkcoder.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-slate-950 border-slate-800 text-white h-12 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium text-slate-300">Palavra-passe</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 dark:text-slate-400" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-slate-950 border-slate-800 text-white h-12 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-base rounded-lg transition-all mt-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Autenticando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Entrar no Painel <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}