import React, { useState } from "react"
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ChevronDown, 
  MoreHorizontal,
  MessageSquare,
  Clock,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"

const chartData = [
  { name: "Jan", received: 200, pending: 150 },
  { name: "Feb", received: 250, pending: 180 },
  { name: "Mar", received: 220, pending: 160 },
  { name: "Apr", received: 300, pending: 200 },
  { name: "May", received: 280, pending: 190 },
  { name: "Jun", received: 350, pending: 250 },
  { name: "Jul", received: 320, pending: 230 },
  { name: "Aug", received: 400, pending: 280 },
  { name: "Sep", received: 380, pending: 260 },
  { name: "Oct", received: 450, pending: 300 },
  { name: "Nov", received: 420, pending: 290 },
  { name: "Dec", received: 500, pending: 350 },
]

const invoices = [
  {
    id: "#2999",
    client: "Josh Adams",
    email: "josh.adams@example.com",
    initials: "JA",
    status: "Paid",
    product: "Acc-serv-2025",
    total: "$199.00",
    timeAgo: "16 h Ago",
    comments: 1
  },
  {
    id: "#2998",
    client: "Emma Watson",
    email: "emma.watson@example.com",
    initials: "EW",
    status: "Over due",
    product: "Figma UI kit",
    total: "$199.00",
    timeAgo: "16 h Ago",
    comments: 1
  },
  {
    id: "#2997",
    client: "Liam Johnson",
    email: "liam.johnson@example.com",
    initials: "LJ",
    status: "Paid",
    product: "Acc-serv-2025",
    total: "$199.00",
    timeAgo: "16 h Ago",
    comments: 1
  },
  {
    id: "#2996",
    client: "Sophie Miller",
    email: "sophie.miller@example.com",
    initials: "SM",
    status: "Over due",
    product: "Acc-serv-2025",
    total: "$199.00",
    timeAgo: "16 h Ago",
    comments: 1
  },
  {
    id: "#2995",
    client: "Oliver Brown",
    email: "oliver.brown@example.com",
    initials: "OB",
    status: "Paid",
    product: "Acc-serv-2025",
    total: "$199.00",
    timeAgo: "16 h Ago",
    comments: 1
  },
  {
    id: "#2994",
    client: "Grace Thompson",
    email: "grace.thompson@example.com",
    initials: "GT",
    status: "Over due",
    product: "Acc-serv-2025",
    total: "$199.00",
    timeAgo: "16 h Ago",
    comments: 1
  },
  {
    id: "#2993",
    client: "Lucas Martinez",
    email: "lucas.martinez@example.com",
    initials: "LM",
    status: "Paid",
    product: "Acc-serv-2025",
    total: "$199.00",
    timeAgo: "16 h Ago",
    comments: 1
  }
]

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Pagamentos (Sales Invoice)</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
            <Download className="mr-2 h-4 w-4" />
            Import/Export
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="mr-2 h-4 w-4" />
            Add Invoice
          </Button>
        </div>
      </div>

      {/* Chart Section */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-50">Total Invoice Analytics</CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-pink-400" />
                <span className="text-slate-500 dark:text-slate-400">Incoming Bills</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-indigo-400" />
                <span className="text-slate-500 dark:text-slate-400">Outgoing Bills</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
              <Clock className="mr-2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              Monthly
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
              <Filter className="mr-2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="bg-white dark:bg-slate-900">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={(value) => `$ ${value} K`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="received" 
                  stroke="#818cf8" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorReceived)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="pending" 
                  stroke="#f472b6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPending)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 rounded-t-xl">
          <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium h-9">
            Status: All Invoice
            <ChevronDown className="ml-2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          </Button>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input 
                placeholder="Search" 
                className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 h-9 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 h-9 px-3">
              <Filter className="mr-2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              Filters
            </Button>
          </div>
        </div>
        
        <Table className="border-t border-slate-100 dark:border-slate-800">
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-100 dark:border-slate-800">
              <TableHead className="w-12 pl-4">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
              </TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Industry</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Id</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Status</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Product/Id</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Grand Total</TableHead>
              <TableHead className="font-medium text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Comment</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, i) => (
              <TableRow key={i} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <TableCell className="pl-4">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
                      <AvatarFallback className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 text-xs font-medium">
                        {invoice.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-50">{invoice.client}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{invoice.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-slate-900 dark:text-slate-50">{invoice.id}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    invoice.status === 'Paid' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-slate-500 dark:text-slate-400">{invoice.product}</TableCell>
                <TableCell className="text-sm font-semibold text-slate-900 dark:text-slate-50">{invoice.total}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                    <span className="text-xs">{invoice.timeAgo}</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span className="text-xs">01</span>
                    </div>
                    <Heart className="h-3.5 w-3.5" />
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900 rounded-b-xl">
          <Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 font-medium">
            <ChevronDown className="h-4 w-4 mr-1 rotate-90" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 dark:text-slate-400">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-medium">2</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 dark:text-slate-400">3</Button>
            <span className="text-slate-400 dark:text-slate-500 px-1">...</span>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-900 dark:text-slate-50 font-medium">
            Next
            <ChevronDown className="h-4 w-4 ml-1 -rotate-90" />
          </Button>
        </div>
      </Card>
    </div>
  )
}