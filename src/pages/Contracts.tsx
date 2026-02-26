import React, { useState, useRef, useEffect } from "react"
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Mail, 
  Edit2, 
  AlertTriangle, 
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  FileWarning
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// --- Types ---
type ContractStatus = "Ativo" | "Aguardando Assinatura" | "Expirando" | "Cancelado"

interface Contract {
  id: string
  clientName: string
  clientDocument: string // CNPJ or Email
  plan: string
  status: ContractStatus
  startDate: string
  endDate: string
}

// --- Mock Data ---
const initialContracts: Contract[] = [
  {
    id: "CTR-001",
    clientName: "Imobiliária Central",
    clientDocument: "12.345.678/0001-90",
    plan: "Profissional",
    status: "Ativo",
    startDate: "01/01/2026",
    endDate: "01/01/2027"
  },
  {
    id: "CTR-002",
    clientName: "Elite Imóveis",
    clientDocument: "elite@imoveis.com.br",
    plan: "Premium",
    status: "Aguardando Assinatura",
    startDate: "15/02/2026",
    endDate: "15/02/2027"
  },
  {
    id: "CTR-003",
    clientName: "Morada Nova",
    clientDocument: "98.765.432/0001-10",
    plan: "Basic",
    status: "Expirando",
    startDate: "10/03/2025",
    endDate: "10/03/2026"
  },
  {
    id: "CTR-004",
    clientName: "Casa Nostra",
    clientDocument: "contato@casanostra.com",
    plan: "Business",
    status: "Cancelado",
    startDate: "05/06/2025",
    endDate: "05/12/2025"
  }
]

// --- Helper Components ---

// Simple Dropdown Menu for Actions
const ActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-slate-400 hover:text-slate-100 dark:hover:bg-slate-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-slate-900 ring-1 ring-black ring-opacity-5 dark:ring-slate-800 z-50 border border-slate-200 dark:border-slate-800">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visualizar PDF
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Reenviar para Assinatura
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
              <Edit2 className="h-4 w-4" />
              Editar Detalhes
            </button>
            <div className="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Rescindir Contrato
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const StatusBadge = ({ status }: { status: ContractStatus }) => {
  switch (status) {
    case "Ativo":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
          Ativo
        </span>
      )
    case "Aguardando Assinatura":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-500 border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
          Pendente
        </span>
      )
    case "Expirando":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-orange-500/10 text-orange-500 border-orange-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>
          Expirando
        </span>
      )
    case "Cancelado":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-red-500/10 text-red-500 border-red-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
          Cancelado
        </span>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function Contracts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [planFilter, setPlanFilter] = useState("Todos")

  // Metrics calculation
  const totalAtivos = initialContracts.filter(c => c.status === "Ativo").length
  const aguardando = initialContracts.filter(c => c.status === "Aguardando Assinatura").length
  const expirando = initialContracts.filter(c => c.status === "Expirando").length
  const cancelados = initialContracts.filter(c => c.status === "Cancelado").length

  // Filtering
  const filteredContracts = initialContracts.filter(contract => {
    const matchesSearch = contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          contract.clientDocument.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "Todos" || contract.status === statusFilter
    const matchesPlan = planFilter === "Todos" || contract.plan === planFilter
    
    return matchesSearch && matchesStatus && matchesPlan
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Contratos e Assinaturas</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gira os contratos de prestação de serviços com as imobiliárias.</p>
        </div>
        <Button className="shrink-0 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 h-10 px-4">
          <FileText className="mr-2 h-4 w-4" />
          Gerar Novo Contrato
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Contratos Ativos
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalAtivos}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Aguardando Assinatura
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{aguardando}</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              A Expirar (30 dias)
            </CardTitle>
            <FileWarning className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{expirando}</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Cancelados/Inativos
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{cancelados}</div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar & Data Table */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden bg-white dark:bg-slate-900">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Procurar por imobiliária ou CNPJ..." 
                className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9 text-sm dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative">
              <select 
                className="h-9 pl-3 pr-8 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-slate-700 dark:text-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="Todos">Status: Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Aguardando Assinatura">Pendente</option>
                <option value="Expirando">Expirando</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                className="h-9 pl-3 pr-8 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-slate-700 dark:text-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
              >
                <option value="Todos">Plano: Todos</option>
                <option value="Starter">Starter</option>
                <option value="Basic">Basic</option>
                <option value="Profissional">Profissional</option>
                <option value="Business">Business</option>
                <option value="Premium">Premium</option>
                <option value="Elite">Elite</option>
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 border-slate-100 dark:border-slate-800">
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider pl-4">ID do Contrato</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Cliente / Imobiliária</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Plano Subscrito</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Data de Início</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Data de Fim</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="w-12 text-right pr-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 border-slate-100 dark:border-slate-800 transition-colors">
                <TableCell className="pl-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {contract.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{contract.clientName}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{contract.clientDocument}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{contract.plan}</span>
                </TableCell>
                <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                  {contract.startDate}
                </TableCell>
                <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                  {contract.endDate}
                </TableCell>
                <TableCell>
                  <StatusBadge status={contract.status} />
                </TableCell>
                <TableCell className="text-right pr-4">
                  <ActionMenu />
                </TableCell>
              </TableRow>
            ))}
            {filteredContracts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500 dark:text-slate-400">
                  Nenhum contrato encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
