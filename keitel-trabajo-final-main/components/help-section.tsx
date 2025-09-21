"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Save, Calendar, Filter, Plus, MessageCircle } from "lucide-react"

const tips = [
  {
    icon: Save,
    title: "Guardado Automático",
    description: "Todo se persiste automáticamente en tu navegador (localStorage).",
  },
  {
    icon: Calendar,
    title: "Gestión de Pagos",
    description: 'Marca "Pagado" y se generará la próxima fecha automáticamente.',
  },
  {
    icon: Filter,
    title: "Filtros por Mes",
    description: "Filtra por mes con los botones superiores para mejor organización.",
  },
  {
    icon: Plus,
    title: "Tipos de Deuda Personalizados",
    description: 'Agrega nuevos tipos de deuda con el campo "Agregar nuevo tipo de deuda".',
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integrado",
    description: '"Enviar WhatsApp" construye el mensaje con los datos del deudor.',
  },
]

export function HelpSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Centro de Ayuda</h2>
          <p className="text-lg text-slate-300">Tips y guías para aprovechar al máximo la aplicación</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon

            return (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <CardTitle className="text-white text-lg">{tip.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-slate-300 leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-cyan-400" />
              Consejo Pro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 leading-relaxed">
              Para una mejor experiencia, organiza tus deudores por tipos de deuda similares y utiliza fechas de pago
              consistentes (por ejemplo, todos los días 15 del mes). Esto te permitirá procesar cobros de manera más
              eficiente y mantener un mejor control de los vencimientos.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
