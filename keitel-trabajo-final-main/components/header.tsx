"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Zap, Home, Grid2X2, Layers, HelpCircle, User, LogOut, Settings } from "lucide-react"
import type { Section } from "@/app/page"
import { useAuth } from "@/contexts/auth-context"

interface HeaderProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  const { user, logout } = useAuth()

  const navItems = [
    { id: "home" as Section, label: "Inicio", icon: Home },
    { id: "app" as Section, label: "Aplicación", icon: Grid2X2 },
    { id: "servicios" as Section, label: "Servicios", icon: Layers },
    { id: "ayuda" as Section, label: "Ayuda", icon: HelpCircle },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
            <Zap className="h-5 w-5 text-slate-950" />
          </div>
          <button
            onClick={() => onSectionChange("home")}
            className="text-xl font-bold text-white hover:text-cyan-400 transition-colors"
          >
            Keitel
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full p-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={`rounded-full gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={`rounded-full ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
              </Button>
            )
          })}
        </nav>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-slate-700 hover:border-cyan-500 transition-colors">
                <AvatarImage src="/diverse-user-avatars.png" alt="Usuario" />
                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950">
                  {user ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-slate-900 border-slate-700" align="end">
            {user && (
              <div className="px-3 py-2 border-b border-slate-700">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-slate-400">{user.businessName}</p>
              </div>
            )}
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
