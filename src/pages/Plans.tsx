import React, { useState, useEffect } from "react"
import { Check, Plus, Edit2, X, Trash2, Shield, Users, Building2, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type Plan = {
  id: string
  name: string
  description?: string
  monthlyPrice: number
  annualPrice: number
  propertiesLimit: string | number
  photosPerProperty: string | number
  usersLimit: string | number
  aiDescriptionsLimit: string | number
  features: string[]
  isPopular?: boolean
}

const initialPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Ideal para corretores independentes.",
    monthlyPrice: 54.90,
    annualPrice: 46.65,
    propertiesLimit: 50,
    photosPerProperty: 40,
    usersLimit: 2,
    aiDescriptionsLimit: 50,
    features: ["Site Premium"],
    isPopular: false
  },
  {
    id: "basic",
    name: "Basic",
    description: "Para pequenas imobiliárias em crescimento.",
    monthlyPrice: 74.90,
    annualPrice: 63.65,
    propertiesLimit: 400,
    photosPerProperty: 60,
    usersLimit: 5,
    aiDescriptionsLimit: 200,
    features: ["CRM Kanban", "Esteira de Leads"],
    isPopular: false
  },
  {
    id: "profissional",
    name: "Profissional",
    description: "O plano mais equilibrado para agências.",
    monthlyPrice: 119.90,
    annualPrice: 101.90,
    propertiesLimit: 1000,
    photosPerProperty: "Ilimitadas",
    usersLimit: 8,
    aiDescriptionsLimit: 600,
    features: ["Gamificação", "Domínio Grátis"],
    isPopular: true
  },
  {
    id: "business",
    name: "Business",
    description: "Para operações em grande escala.",
    monthlyPrice: 179.90,
    annualPrice: 152.90,
    propertiesLimit: 2000,
    photosPerProperty: "Ilimitadas",
    usersLimit: 12,
    aiDescriptionsLimit: 1000,
    features: ["Contratos e Finanças", "Automação E-mail/WhatsApp"],
    isPopular: false
  },
  {
    id: "premium",
    name: "Premium",
    description: "Acesso total com IA avançada.",
    monthlyPrice: 249.90,
    annualPrice: 212.40,
    propertiesLimit: 3500,
    photosPerProperty: "Ilimitadas",
    usersLimit: 20,
    aiDescriptionsLimit: 1450,
    features: ["IA Aura Liberada", "API Avançada"],
    isPopular: false
  },
  {
    id: "elite",
    name: "Elite",
    description: "Sem limites. Para os líderes de mercado.",
    monthlyPrice: 349.90,
    annualPrice: 297.40,
    propertiesLimit: "Ilimitados",
    photosPerProperty: "Ilimitadas",
    usersLimit: "Ilimitados",
    aiDescriptionsLimit: "Ilimitada",
    features: ["Suporte VIP 24h", "Todos os módulos"],
    isPopular: false
  }
]

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form State
  const [formData, setFormData] = useState<Partial<Plan>>({})

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan)
    setFormData({ ...plan })
    setIsModalOpen(true)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 600)
  }

  const handleAddNew = () => {
    setEditingPlan(null)
    setFormData({
      name: "",
      description: "",
      monthlyPrice: 0,
      annualPrice: 0,
      propertiesLimit: "",
      photosPerProperty: "",
      usersLimit: "",
      aiDescriptionsLimit: "",
      features: []
    })
    setIsModalOpen(true)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 600)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este plano?")) {
      setPlans(plans.filter(p => p.id !== id))
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setEditingPlan(null)
      setFormData({})
    }, 300) // Wait for transition
  }

  const handleSave = () => {
    if (!formData.name) {
      alert("O nome do plano é obrigatório.")
      return
    }

    if (editingPlan) {
      // Update existing
      setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...formData } as Plan : p))
    } else {
      // Add new
      const newPlan: Plan = {
        ...(formData as Plan),
        id: `plan-${Date.now()}`,
        isPopular: false
      }
      setPlans([...plans, newPlan])
    }
    closeModal()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const handleFeatureToggle = (featureName: string, checked: boolean) => {
    setFormData(prev => {
      const currentFeatures = prev.features || []
      if (checked) {
        return { ...prev, features: [...currentFeatures, featureName] }
      } else {
        return { ...prev, features: currentFeatures.filter(f => f !== featureName) }
      }
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Gestão de Planos</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Visualize, edite e gira os planos de subscrição oferecidos às imobiliárias.</p>
        </div>
        <Button onClick={handleAddNew} className="shrink-0 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 h-10 px-4">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Novo Plano
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const totalAnnual = plan.annualPrice * 12;
          return (
          <Card key={plan.id} className={`relative flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md ${plan.isPopular ? 'ring-2 ring-indigo-500 dark:ring-indigo-500' : ''}`}>
            {plan.isPopular && (
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <Badge className="bg-indigo-500 text-white hover:bg-indigo-600 border-none px-3 py-0.5 text-xs font-semibold uppercase tracking-wider shadow-sm">Destaque / Mais Popular</Badge>
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => handleEdit(plan)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 dark:hover:text-red-400" onClick={() => handleDelete(plan.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-extrabold text-slate-900 dark:text-white">
                R$ {plan.monthlyPrice.toFixed(2).replace('.', ',')}
                <span className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400">/mês</span>
              </div>
              <div className="flex flex-col mt-1">
                <p className="text-xs text-slate-500 dark:text-slate-400">ou R$ {plan.annualPrice.toFixed(2).replace('.', ',')}/mês no plano anual</p>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">Total Anual: R$ {totalAnnual.toFixed(2).replace('.', ',')}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pt-0">
              <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 flex items-center gap-1"><Building2 className="h-3 w-3"/> Imóveis</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{plan.propertiesLimit}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 flex items-center gap-1"><Users className="h-3 w-3"/> Utilizadores</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{plan.usersLimit}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 flex items-center gap-1"><Sparkles className="h-3 w-3"/> Descrições IA</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{plan.aiDescriptionsLimit}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1 flex items-center gap-1"><Shield className="h-3 w-3"/> Fotos/Imóvel</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{plan.photosPerProperty}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Funcionalidades Incluídas</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-indigo-500 dark:text-indigo-400 shrink-0 mr-2 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )})}
      </div>

      {/* Slide-over Modal for Editing/Adding Plan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal} />
          <div className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10">
            <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out">
              <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800">
                <div className="px-6 py-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {editingPlan ? "Editar Plano" : "Adicionar Novo Plano"}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {editingPlan ? `A editar as configurações do plano ${editingPlan.name}` : "Configure os detalhes e limites do novo plano."}
                      </p>
                    </div>
                    <div className="ml-3 flex h-7 items-center">
                      <Button variant="ghost" size="icon" onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex-1 px-6 py-8 space-y-8">
                  {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
                      <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">A carregar dados...</p>
                    </div>
                  ) : null}
                  
                  {/* Informações Básicas */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Informações Básicas</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Nome do Plano</Label>
                        <Input id="name" value={formData.name || ""} onChange={handleInputChange} placeholder="Ex: Starter" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-700 dark:text-slate-300">Descrição</Label>
                        <Input id="description" value={formData.description || ""} onChange={handleInputChange} placeholder="Breve descrição do plano..." className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="monthlyPrice" className="text-slate-700 dark:text-slate-300">Preço Mensal (R$)</Label>
                          <Input id="monthlyPrice" type="number" value={formData.monthlyPrice || ""} onChange={handleInputChange} placeholder="0.00" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="annualPrice" className="text-slate-700 dark:text-slate-300">Preço Anual (R$/mês)</Label>
                          <Input id="annualPrice" type="number" value={formData.annualPrice || ""} onChange={handleInputChange} placeholder="0.00" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Limites Técnicos */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Limites Técnicos</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertiesLimit" className="text-slate-700 dark:text-slate-300">Qtd. de Imóveis</Label>
                        <Input id="propertiesLimit" value={formData.propertiesLimit || ""} onChange={handleInputChange} placeholder="Ex: 50 ou Ilimitados" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="photosPerProperty" className="text-slate-700 dark:text-slate-300">Fotos por Imóvel</Label>
                        <Input id="photosPerProperty" value={formData.photosPerProperty || ""} onChange={handleInputChange} placeholder="Ex: 40" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="usersLimit" className="text-slate-700 dark:text-slate-300">Utilizadores</Label>
                        <Input id="usersLimit" value={formData.usersLimit || ""} onChange={handleInputChange} placeholder="Ex: 2" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aiDescriptionsLimit" className="text-slate-700 dark:text-slate-300">Descrições IA</Label>
                        <Input id="aiDescriptionsLimit" value={formData.aiDescriptionsLimit || ""} onChange={handleInputChange} placeholder="Ex: 50" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Funcionalidades Extra */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Funcionalidades Extra</h3>
                    
                    <div className="space-y-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base text-slate-900 dark:text-slate-200">CRM Kanban</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Gestão visual de leads e negócios.</p>
                        </div>
                        <Switch 
                          checked={formData.features?.includes("CRM Kanban") || false} 
                          onCheckedChange={(checked) => handleFeatureToggle("CRM Kanban", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base text-slate-900 dark:text-slate-200">Módulo de Gamificação</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Sistema de pontos e recompensas para corretores.</p>
                        </div>
                        <Switch 
                          checked={formData.features?.includes("Gamificação") || false} 
                          onCheckedChange={(checked) => handleFeatureToggle("Gamificação", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base text-slate-900 dark:text-slate-200">Módulo de Contratos</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Geração e gestão de contratos imobiliários.</p>
                        </div>
                        <Switch 
                          checked={formData.features?.includes("Contratos e Finanças") || false} 
                          onCheckedChange={(checked) => handleFeatureToggle("Contratos e Finanças", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base text-slate-900 dark:text-slate-200">IA Aura</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Assistente virtual inteligente avançada.</p>
                        </div>
                        <Switch 
                          checked={formData.features?.includes("IA Aura Liberada") || false} 
                          onCheckedChange={(checked) => handleFeatureToggle("IA Aura Liberada", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 z-10 flex gap-3">
                  <Button variant="outline" className="flex-1 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300" onClick={closeModal}>Cancelar</Button>
                  <Button className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600" onClick={handleSave}>Guardar Plano</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
