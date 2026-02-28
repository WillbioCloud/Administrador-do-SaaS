import React from "react"
import { 
  Building2, 
  Users, 
  CreditCard, 
  UserMinus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

const revenueData = [
  { name: "Jan", revenue: 45000 },
  { name: "Fev", revenue: 52000 },
  { name: "Mar", revenue: 48000 },
  { name: "Abr", revenue: 61000 },
  { name: "Mai", revenue: 75000 },
  { name: "Jun", revenue: 86000 },
  { name: "Jul", revenue: 105000 },
]

// Seus planos oficiais atualizados
const planData = [
  { name: "Starter", users: 120 },
  { name: "Basic", users: 200 },
  { name: "Profissional", users: 450 },
  { name: "Business", users: 300 },
  { name: "Premium", users: 150 },
  { name: "Elite", users: 80 },
]

const stats = [
  {
    name: "Total de Clientes Ativos",
    value: "1.300",
    icon: Users,
    change: "+12.5%",
    changeType: "positive",
    description: "em relação ao mês passado"
  },
  {
    name: "Receita Recorrente (MRR)",
    value: "R$ 105.000,00",
    icon: CreditCard,
    change: "+18.2%",
    changeType: "positive",
    description: "em relação ao mês passado"
  },
  {
    name: "Novos Clientes (Mês)",
    value: "142",
    icon: Building2,
    change: "+5.4%",
    changeType: "positive",
    description: "em relação ao mês passado"
  },
  {
    name: "Cancelamentos (Mês)",
    value: "12",
    icon: UserMinus,
    change: "-2.1%", 
    changeType: "positive", // Menos cancelamentos é algo positivo!
    description: "em relação ao mês passado"
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Visão geral do desempenho e faturamento do ArkCoder.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.name}
              </CardTitle>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                <stat.icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <p className="flex items-center text-xs mt-2">
                {stat.changeType === "positive" ? (
                  <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-md font-medium">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded-md font-medium">
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                    {stat.change}
                  </span>
                )}
                <span className="ml-2 text-slate-500 dark:text-slate-500">{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Evolução da Receita (MRR)</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Crescimento do faturamento recorrente ao longo do ano.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => `R$ ${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                    itemStyle={{ color: '#818cf8' }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#818cf8" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#818cf8', strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Adesões por Plano</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Distribuição de clientes ativos nos seus 6 planos.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={planData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#334155', opacity: 0.1 }}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                    itemStyle={{ color: '#818cf8' }}
                    formatter={(value: number) => [value, 'Clientes']}
                  />
                  <Bar 
                    dataKey="users" 
                    fill="#818cf8" 
                    radius={[4, 4, 0, 0]} 
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}