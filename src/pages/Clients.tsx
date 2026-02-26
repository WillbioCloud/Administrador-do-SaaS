import React, { useState } from "react"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus,
  Building2,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  X,
  Users,
  ChevronDown,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const clients = [
  {
    id: "1",
    name: "Imobiliária Horizonte",
    tenantId: "t_horiz_01",
    plan: "Enterprise",
    status: "Ativo",
    joinDate: "12 Jan 2023",
    email: "contato@horizonte.pt",
    phone: "+351 912 345 678",
    properties: 1240,
    agents: 45,
    mrr: 499
  },
  {
    id: "2",
    name: "Casas & Cia",
    tenantId: "t_casas_02",
    plan: "Pro",
    status: "Ativo",
    joinDate: "05 Fev 2023",
    email: "geral@casasecia.pt",
    phone: "+351 923 456 789",
    properties: 350,
    agents: 12,
    mrr: 199
  },
  {
    id: "3",
    name: "Premium Real Estate",
    tenantId: "t_prem_03",
    plan: "Starter",
    status: "Inadimplente",
    joinDate: "20 Mar 2023",
    email: "info@premiumre.pt",
    phone: "+351 934 567 890",
    properties: 45,
    agents: 3,
    mrr: 49
  },
  {
    id: "4",
    name: "Lisboa Properties",
    tenantId: "t_lisboa_04",
    plan: "Enterprise",
    status: "Cancelado",
    joinDate: "15 Abr 2023",
    email: "hello@lisboaprop.pt",
    phone: "+351 945 678 901",
    properties: 890,
    agents: 30,
    mrr: 499
  },
  {
    id: "5",
    name: "Porto Habitação",
    tenantId: "t_porto_05",
    plan: "Pro",
    status: "Ativo",
    joinDate: "01 Mai 2023",
    email: "contato@portohab.pt",
    phone: "+351 956 789 012",
    properties: 420,
    agents: 15,
    mrr: 199
  }
]

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null)

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.tenantId.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <Button className="shrink-0 bg-slate-900 text-white hover:bg-slate-800 h-9">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
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
              <TableHead className="w-12 pl-4">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
              </TableHead>
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Imobiliária</TableHead>
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Tenant ID</TableHead>
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Plano</TableHead>
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Estado</TableHead>
              <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Data de Adesão</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="cursor-pointer hover:bg-slate-50/50 border-slate-100" onClick={() => setSelectedClient(client)}>
                <TableCell className="pl-4">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" onClick={(e) => e.stopPropagation()} />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200">
                      <AvatarFallback className="bg-slate-50 text-slate-600 text-xs font-medium">
                        {client.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{client.name}</span>
                      <span className="text-xs text-slate-500">{client.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 font-mono text-xs">{client.tenantId}</TableCell>
                <TableCell>
                  <Badge variant={client.plan === "Enterprise" ? "default" : client.plan === "Pro" ? "secondary" : "outline"} className="font-medium">
                    {client.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    client.status === 'Ativo' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : client.status === 'Inadimplente'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {client.status === 'Ativo' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>}
                    {client.status === 'Inadimplente' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>}
                    {client.status === 'Cancelado' && <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-1.5"></span>}
                    {client.status}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">{client.joinDate}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" onClick={(e) => { e.stopPropagation(); setSelectedClient(client); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-white">
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-medium text-slate-900">1</span> a <span className="font-medium text-slate-900">{filteredClients.length}</span> de <span className="font-medium text-slate-900">{clients.length}</span> resultados
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-slate-500 font-medium h-8 bg-white border-slate-200">
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 bg-slate-50 text-slate-900 font-medium">1</Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">2</Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">3</Button>
              <span className="text-slate-400 px-1">...</span>
            </div>
            <Button variant="outline" size="sm" className="text-slate-900 font-medium h-8 bg-white border-slate-200">
              Próxima
            </Button>
          </div>
        </div>
      </Card>

      {/* Slide-over for Client Details */}
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
                          {selectedClient.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{selectedClient.name}</h2>
                        <p className="text-sm text-slate-500 font-mono mt-1">{selectedClient.tenantId}</p>
                      </div>
                    </div>
                    <div className="ml-3 flex h-7 items-center">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex-1 px-6 py-8 space-y-8">
                  {/* Status & Plan */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</p>
                      <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        selectedClient.status === 'Ativo' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : selectedClient.status === 'Inadimplente'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {selectedClient.status === 'Ativo' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>}
                        {selectedClient.status === 'Inadimplente' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>}
                        {selectedClient.status === 'Cancelado' && <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-1.5"></span>}
                        {selectedClient.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Plano</p>
                      <Badge className="mt-2" variant={selectedClient.plan === "Enterprise" ? "default" : selectedClient.plan === "Pro" ? "secondary" : "outline"}>
                        {selectedClient.plan}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">MRR</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">€{selectedClient.mrr}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-4">Informações de Contacto</h3>
                    <dl className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-100">
                          <Mail className="h-4 w-4 text-slate-500" />
                        </div>
                        <dd className="text-sm text-slate-700">{selectedClient.email}</dd>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-100">
                          <Phone className="h-4 w-4 text-slate-500" />
                        </div>
                        <dd className="text-sm text-slate-700">{selectedClient.phone}</dd>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-100">
                          <Calendar className="h-4 w-4 text-slate-500" />
                        </div>
                        <dd className="text-sm text-slate-700">Aderiu em {selectedClient.joinDate}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Usage Stats */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-4">Utilização</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Building2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Imóveis</span>
                          </div>
                          <p className="text-2xl font-bold text-slate-900">{selectedClient.properties}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Users className="h-4 w-4" />
                            <span className="text-sm font-medium">Corretores</span>
                          </div>
                          <p className="text-2xl font-bold text-slate-900">{selectedClient.agents}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 flex gap-3 border-t border-slate-100">
                    <Button className="flex-1 bg-slate-900 text-white hover:bg-slate-800">Editar Cliente</Button>
                    <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:text-red-700 hover:bg-red-50">Suspender</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
