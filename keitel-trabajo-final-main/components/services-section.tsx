"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Package, Users, BarChart3, Settings, Shield, Zap } from "lucide-react"

const productFeatures = [
  {
    name: "Gestión de Productos",
    icon: Package,
    description: "Administra cualquier tipo de producto o servicio que vendas a tus clientes.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Control de Clientes",
    icon: Users,
    description: "Mantén un registro completo de todos tus clientes y sus compras.",
    gradient: "from-green-500 to-green-600",
  },
  {
    name: "Seguimiento de Pagos",
    icon: BarChart3,
    description: "Controla fechas de pago, montos y estado de cada transacción.",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    name: "Configuración Flexible",
    icon: Settings,
    description: "Personaliza tipos de productos y servicios según tu negocio.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    name: "Datos Seguros",
    icon: Shield,
    description: "Toda la información se guarda localmente en tu navegador.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Interfaz Rápida",
    icon: Zap,
    description: "Acceso instantáneo a todas las funciones desde una sola pantalla.",
    gradient: "from-red-500 to-red-600",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Gestión Completa</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Administra cualquier tipo de producto o servicio desde una sola plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productFeatures.map((feature, index) => {
            const Icon = feature.icon

            return (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:-translate-y-1 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>

                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
