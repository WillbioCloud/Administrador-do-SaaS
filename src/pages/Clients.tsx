import React, { useEffect, useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Building2,
  Calendar,
  X,
  Users,
  ChevronDown,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase"

export default function Clients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<any | null>(null)

  // Estados para o Modal de Nova Empresa
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false)
  const [newCompany, setNewCompany] = useState({ name: "", plan: "business" })
  const [isCreating, setIsCreating] = useState(false)

  // Busca as empresas no banco de dados
  const fetchCompanies = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setClients(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  // Cria uma nova empresa e gera o subdomínio
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCompany.name.trim()) return

    setIsCreating(true)

    // Gera o subdomínio limpo (ex: "TR Imóveis" -> "tr-imoveis")
    const generatedSlug = newCompany.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")

    const { error } = await supabase.from("companies").insert([
      {
        name: newCompany.name,
        slug: generatedSlug,
        plan: newCompany.plan,
        active: true
      }
    ])

    if (error) {
      alert("Erro ao criar empresa: " + error.message)
    } else {
      setIsNewClientModalOpen(false)
      setNewCompany({ name: "", plan: "business" })
      fetchCompanies() // Recarrega a lista
    }
    setIsCreating(false)
  }

  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase()
    return (
      client.name?.toLowerCase().includes(term) ||
      client.slug?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Clientes</h2>
          <p className="text-sm text-slate-500 mt-1">Faça a gestão das imobiliárias que utilizam a plataforma.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-slate-200 text-slate-700 h-9">
            <Download className="mr-2 h-4 w-4 text-slate-400" />
            Exportar
          </Button>
          <Button onClick={() => setIsNewClientModalOpen(true)} className="bg-brand-600 hover:bg-brand-700">
            <Plus className="mr-2 h-4 w-4" />
            Nova Empresa
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-medium h-9">
              Status: Todos
              <ChevronDown className="ml-2 h-4 w-4 text-slate-400" />
            </Button>
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-medium h-9">
              Plano: Todos
              <ChevronDown className="ml-2 h-4 w-4 text-slate-400" />
            </Button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Pesquisar clientes..."
                className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 h-9 px-3">
              <Filter className="mr-2 h-4 w-4 text-slate-400" />
              Filtros
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-slate-100">
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Imobiliária</TableHead>
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Plano</TableHead>
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Estado</TableHead>
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Data de Adesão</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                  Carregando empresas...
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                  Nenhuma empresa cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow
                  key={client.id}
                  className="cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setSelectedClient(client)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                          {client.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">{client.name}</p>
                        <p className="text-xs text-slate-500">{client.slug}.seusaas.com</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                      {client.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={client.active ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200" : "bg-red-50 text-red-700 hover:bg-red-100 border-red-200"}>
                      {client.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(client.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-white">
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-medium text-slate-900">{loading ? 0 : filteredClients.length === 0 ? 0 : 1}</span> a <span className="font-medium text-slate-900">{filteredClients.length}</span> de <span className="font-medium text-slate-900">{clients.length}</span> resultados
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-slate-500 font-medium h-8 bg-white border-slate-200">
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="text-slate-900 font-medium h-8 bg-white border-slate-200">
              Próxima
            </Button>
          </div>
        </div>
      </Card>

      {selectedClient && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 transition-opacity backdrop-blur-sm" onClick={() => setSelectedClient(null)} />
          <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10">
            <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
                <div className="px-6 py-6 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border border-slate-200 shadow-sm">
                        <AvatarFallback className="bg-white text-slate-700 text-xl font-medium">
                          {selectedClient.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{selectedClient.name}</h2>
                        <p className="text-sm text-slate-500 font-mono mt-1">{selectedClient.slug}.seusaas.com</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="relative flex-1 px-6 py-8 space-y-8">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</p>
                      <Badge className={`mt-2 ${selectedClient.active ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                        {selectedClient.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Plano</p>
                      <Badge className="mt-2" variant="secondary">
                        {selectedClient.plan}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Criada em</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{new Date(selectedClient.created_at).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-4">Resumo</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Building2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Slug</span>
                          </div>
                          <p className="text-base font-bold text-slate-900 break-all">{selectedClient.slug}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Users className="h-4 w-4" />
                            <span className="text-sm font-medium">ID</span>
                          </div>
                          <p className="text-base font-bold text-slate-900 break-all">{selectedClient.id}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white border-slate-200 shadow-sm col-span-2">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">Última atualização</span>
                          </div>
                          <p className="text-base font-bold text-slate-900">{selectedClient.updated_at ? new Date(selectedClient.updated_at).toLocaleString("pt-BR") : "Não disponível"}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nova Empresa */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Adicionar Nova Empresa</h3>
              <button onClick={() => setIsNewClientModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateCompany} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nome da Imobiliária</label>
                <Input
                  placeholder="Ex: TR Imóveis"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  required
                />
                {newCompany.name && (
                  <p className="text-xs text-slate-500 mt-2">
                    Subdomínio gerado: <strong className="text-brand-600">{newCompany.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}</strong>.seusaas.com
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Plano Inicial</label>
                <select
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newCompany.plan}
                  onChange={(e) => setNewCompany({ ...newCompany, plan: e.target.value })}
                >
                  <option value="starter">Starter</option>
                  <option value="basic">Basic</option>
                  <option value="professional">Professional</option>
                  <option value="business">Business</option>
                  <option value="premium">Premium</option>
                  <option value="elite">Elite</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsNewClientModalOpen(false)}>Cancelar</Button>
                <Button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-700" disabled={isCreating}>
                  {isCreating ? "Criando..." : "Criar Empresa"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}