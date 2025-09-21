"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, UserPlus, Building2, X, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface RegisterFormProps {
  onSwitchToLogin: () => void
  onClose?: () => void
}

export function RegisterForm({ onSwitchToLogin, onClose }: RegisterFormProps) {
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
  })

  const [userProducts, setUserProducts] = useState<string[]>([])
  const [newProduct, setNewProduct] = useState("")

  const businessTypes = [
    "Streaming/Entretenimiento",
    "Productos Lácteos",
    "Servicios Digitales",
    "E-commerce",
    "Consultoría",
    "Educación",
    "Salud y Bienestar",
    "Tecnología",
    "Alimentación",
    "Otro",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (userProducts.length === 0) {
      setError("Por favor agrega al menos un producto o servicio que vendes")
      return
    }

    setIsLoading(true)

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      businessName: formData.businessName,
      businessType: formData.businessType,
      products: userProducts, // Use user's custom products
    })

    setIsLoading(false)

    if (success) {
      setError("")
      alert("¡Cuenta creada exitosamente! Ahora inicia sesión con tus credenciales.")
      onSwitchToLogin()
    } else {
      setError("El email ya está registrado")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addUserProduct = () => {
    if (newProduct.trim() && !userProducts.includes(newProduct.trim())) {
      setUserProducts((prev) => [...prev, newProduct.trim()])
      setNewProduct("")
    }
  }

  const removeProduct = (product: string) => {
    setUserProducts((prev) => prev.filter((p) => p !== product))
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
              <UserPlus className="h-6 w-6 text-slate-950" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Crear Cuenta</CardTitle>
          <CardDescription className="text-slate-400">Únete a Keitel y gestiona tu negocio</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Nombre completo
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Tu nombre completo"
                required
              />
            </div>

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
              <Label htmlFor="businessName" className="text-slate-300">
                Nombre del negocio
              </Label>
              <Input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Nombre de tu empresa"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-slate-300">
                Tipo de negocio
              </Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Selecciona tu tipo de negocio" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-slate-700">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Agrega tus productos o servicios</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Ej: Pollo, Software, Consultoría..."
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addUserProduct())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addUserProduct}
                  className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {userProducts.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {userProducts.map((product) => (
                    <Badge
                      key={product}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 cursor-pointer"
                      onClick={() => removeProduct(product)}
                    >
                      {product} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
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
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">
                Confirmar contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Repite tu contraseña"
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
                  Creando cuenta...
                </>
              ) : (
                <>
                  <Building2 className="mr-2 h-4 w-4" />
                  Crear cuenta
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
