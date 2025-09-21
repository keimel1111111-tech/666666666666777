"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, LogIn, Zap, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface LoginFormProps {
  onSwitchToRegister: () => void
  onClose?: () => void
}

export function LoginForm({ onSwitchToRegister, onClose }: LoginFormProps) {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(formData.email, formData.password)

    setIsLoading(false)

    if (!success) {
      setError("Email o contraseña incorrectos")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <Card className="w-full max-w-md bg-slate-900/50 border-slate-700 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center">
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
              <Zap className="h-6 w-6 text-slate-950" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Iniciar Sesión</CardTitle>
          <CardDescription className="text-slate-400">Accede a tu plataforma de gestión</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Tu contraseña"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar sesión
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
