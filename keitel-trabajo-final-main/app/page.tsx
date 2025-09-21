"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ClientManager } from "@/components/client-manager"
import { HelpSection } from "@/components/help-section"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { AuthWrapper } from "@/components/auth/auth-wrapper"
import { Loader2 } from "lucide-react"

export type Section = "home" | "app" | "servicios" | "ayuda"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [showAuth, setShowAuth] = useState(false)
  const { user, isLoading, showApp } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  if (user && showApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <Header activeSection="app" onSectionChange={setActiveSection} />
        <main>
          <ClientManager />
        </main>
        <Footer onSectionChange={setActiveSection} />
      </div>
    )
  }

  if (showAuth && !user) {
    return <AuthWrapper onClose={() => setShowAuth(false)} />
  }

  const handleSectionChange = (section: Section) => {
    if (section === "app" && !user) {
      setShowAuth(true)
      return
    }
    setActiveSection(section)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Header activeSection={activeSection} onSectionChange={handleSectionChange} />

      <main>
        {activeSection === "home" && <HeroSection onSectionChange={handleSectionChange} />}
        {activeSection === "servicios" && <ServicesSection />}
        {activeSection === "app" && user && <ClientManager />}
        {activeSection === "ayuda" && <HelpSection />}
      </main>

      <Footer onSectionChange={handleSectionChange} />
    </div>
  )
}
