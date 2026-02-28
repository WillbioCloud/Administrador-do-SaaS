import React, { useState } from "react"
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  MoreVertical,
  Paperclip,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Priority = "Alta" | "Média" | "Baixa"
type Status = "Aberto" | "Pendente" | "Resolvido"

interface Message {
  id: string
  sender: "client" | "admin"
  text: string
  timestamp: string
}

interface Ticket {
  id: string
  clientName: string
  subject: string
  priority: Priority
  status: Status
  timeElapsed: string
  messages: Message[]
}

const initialTickets: Ticket[] = [
  {
    id: "TKT-1042",
    clientName: "Imobiliária Central",
    subject: "Dúvida no cadastro de imóveis",
    priority: "Alta",
    status: "Aberto",
    timeElapsed: "há 2 horas",
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "Olá, estou a tentar adicionar um novo imóvel mas o campo de 'Área Útil' não está a guardar o valor que insiro. Podem ajudar?",
        timestamp: "10:30"
      },
      {
        id: "m2",
        sender: "admin",
        text: "Olá! Obrigado por nos contactar. Já identificámos o problema e a nossa equipa técnica está a trabalhar numa correção. Deve estar resolvido na próxima hora.",
        timestamp: "10:45"
      }
    ]
  },
  {
    id: "TKT-1041",
    clientName: "Elite Imóveis",
    subject: "Como configurar a IA Aura?",
    priority: "Média",
    status: "Pendente",
    timeElapsed: "há 5 horas",
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "Bom dia, ativámos o plano Premium mas não sabemos onde configurar as respostas automáticas da IA Aura para o WhatsApp.",
        timestamp: "08:15"
      }
    ]
  },
  {
    id: "TKT-1038",
    clientName: "Casa Nostra",
    subject: "Fatura não recebida",
    priority: "Baixa",
    status: "Resolvido",
    timeElapsed: "há 2 dias",
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "A fatura referente ao mês de Janeiro ainda não chegou ao nosso email financeiro.",
        timestamp: "14:20"
      },
      {
        id: "m2",
        sender: "admin",
        text: "Pedimos desculpa pelo atraso. A fatura foi reenviada agora mesmo para o email registado. Por favor, verifique também a pasta de spam.",
        timestamp: "15:00"
      },
      {
        id: "m3",
        sender: "client",
        text: "Recebido, muito obrigado!",
        timestamp: "15:30"
      }
    ]
  }
]

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  switch (priority) {
    case "Alta":
      return <Badge variant="outline" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10">Alta</Badge>
    case "Média":
      return <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10">Média</Badge>
    case "Baixa":
      return <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10">Baixa</Badge>
  }
}

const StatusIcon = ({ status }: { status: Status }) => {
  switch (status) {
    case "Aberto":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case "Pendente":
      return <Clock className="h-4 w-4 text-amber-500" />
    case "Resolvido":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
  }
}

export default function Support() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [selectedTicketId, setSelectedTicketId] = useState<string>(initialTickets[0].id)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [replyText, setReplyText] = useState("")

  const selectedTicket = tickets.find(t => t.id === selectedTicketId)

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "Todos" || ticket.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return

    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: "admin",
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setTickets(tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return { ...t, messages: [...t.messages, newMessage] }
      }
      return t
    }))
    setReplyText("")
  }

  const handleResolveTicket = () => {
    if (!selectedTicket) return
    setTickets(tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return { ...t, status: "Resolvido" as Status }
      }
      return t
    }))
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Help Desk</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gerencie os pedidos de suporte das imobiliárias.</p>
      </div>

      <div className="flex-1 flex overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
        
        {/* Left Column: Ticket List */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
          {/* List Header & Filters */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 space-y-3 bg-white dark:bg-slate-900">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input 
                placeholder="Procurar tickets..." 
                className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 h-9 text-sm dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select 
                className="w-full h-9 pl-3 pr-8 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="Todos">Todos os Estados</option>
                <option value="Aberto">Aberto</option>
                <option value="Pendente">Pendente</option>
                <option value="Resolvido">Resolvido</option>
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Ticket Items */}
          <div className="flex-1 overflow-y-auto">
            {filteredTickets.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filteredTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={cn(
                      "w-full text-left p-4 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:bg-slate-800/80",
                      selectedTicketId === ticket.id 
                        ? "bg-indigo-50/50 dark:bg-indigo-500/10 border-l-2 border-l-indigo-500" 
                        : "border-l-2 border-l-transparent"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-50 truncate pr-2">
                        {ticket.clientName}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {ticket.timeElapsed}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 truncate mb-3">
                      {ticket.subject}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon status={ticket.status} />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{ticket.status}</span>
                      </div>
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center">
                <MessageSquare className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-sm">Nenhum ticket encontrado.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Ticket View / Chat */}
        {selectedTicket ? (
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
            {/* Chat Header */}
            <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
                  <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium">
                    {selectedTicket.clientName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 truncate flex items-center gap-2">
                    {selectedTicket.clientName}
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({selectedTicket.id})</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{selectedTicket.subject}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0 ml-4">
                {selectedTicket.status !== "Resolvido" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hidden sm:flex h-8 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                    onClick={handleResolveTicket}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Marcar como Resolvido
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-300">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950">
              {selectedTicket.messages.map((msg, idx) => {
                const isAdmin = msg.sender === "admin"
                return (
                  <div key={msg.id} className={cn("flex w-full", isAdmin ? "justify-end" : "justify-start")}>
                    <div className={cn("flex max-w-[80%] gap-3", isAdmin ? "flex-row-reverse" : "flex-row")}>
                      <Avatar className="h-8 w-8 shrink-0 mt-1">
                        {isAdmin ? (
                          <>
                            <AvatarImage src="https://picsum.photos/seed/admin/200/200" referrerPolicy="no-referrer" />
                            <AvatarFallback>AD</AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs">
                            {selectedTicket.clientName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div className={cn("flex flex-col", isAdmin ? "items-end" : "items-start")}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                            {isAdmin ? "Você (Suporte)" : selectedTicket.clientName}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">{msg.timestamp}</span>
                        </div>
                        <div 
                          className={cn(
                            "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                            isAdmin 
                              ? "bg-indigo-600 text-white rounded-tr-sm" 
                              : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800/50 rounded-tl-sm"
                          )}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Chat Input Footer */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
              {selectedTicket.status === "Resolvido" ? (
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800/50 text-sm text-slate-500 dark:text-slate-400">
                  Este ticket foi marcado como resolvido. Não é possível enviar novas mensagens.
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-300">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Textarea 
                    placeholder="Escreva a sua resposta..." 
                    className="min-h-[40px] max-h-32 resize-none bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 dark:text-white py-3"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendReply()
                      }
                    }}
                  />
                  <Button 
                    className="shrink-0 h-10 w-10 p-0 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-full"
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500">
            <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
            <p>Selecione um ticket para visualizar a conversa.</p>
          </div>
        )}
      </div>
    </div>
  )
}
