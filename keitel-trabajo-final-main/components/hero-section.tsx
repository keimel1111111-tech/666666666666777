"use client"

import { Button } from "@/components/ui/button"
import { Rocket, Grid2X2 } from "lucide-react"
import type { Section } from "@/app/page"

interface HeroSectionProps {
  onSectionChange: (section: Section) => void
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Plataforma de{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Gestión</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Administra tus clientes, fechas de pago, productos y servicios desde un panel minimalista con look futurista.
          Perfecto para cualquier negocio: streaming, productos lácteos, servicios digitales y más.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => onSectionChange("app")}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Ir a la aplicación
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => onSectionChange("servicios")}
            className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800/50 hover:border-slate-500"
          >
            <Grid2X2 className="mr-2 h-5 w-5" />
            Ver servicios
          </Button>
        </div>
      </div>
    </section>
  )
}
