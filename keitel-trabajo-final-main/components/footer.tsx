"use client"

import type { Section } from "@/app/page"

interface FooterProps {
  onSectionChange: (section: Section) => void
}

export function Footer({ onSectionChange }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: "Inicio", section: "home" as Section },
    { label: "Aplicación", section: "app" as Section },
    { label: "Servicios", section: "servicios" as Section },
    { label: "Ayuda", section: "ayuda" as Section },
  ]

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-slate-400 mb-4">© {currentYear} KeitelStream. Minimal • Futurista • Rápido</p>

          <div className="flex justify-center gap-6 flex-wrap">
            {footerLinks.map((link, index) => (
              <button
                key={link.section}
                onClick={() => onSectionChange(link.section)}
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.label}
                {index < footerLinks.length - 1 && <span className="ml-6 text-slate-600">·</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
