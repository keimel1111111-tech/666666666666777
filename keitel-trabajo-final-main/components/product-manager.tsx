"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function ProductManager() {
  const { user } = useAuth()
  const [products, setProducts] = useState<string[]>([])
  const [newProduct, setNewProduct] = useState("")

  // Load user's products on mount
  useEffect(() => {
    if (user) {
      const savedProducts = localStorage.getItem(`keitel_default_services_${user.id}`)
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts))
      }
    }
  }, [user])

  // Save products whenever they change
  useEffect(() => {
    if (user && products.length > 0) {
      localStorage.setItem(`keitel_default_services_${user.id}`, JSON.stringify(products))
    }
  }, [products, user])

  const addProduct = () => {
    if (newProduct.trim() && !products.includes(newProduct.trim())) {
      setProducts((prev) => [...prev, newProduct.trim()])
      setNewProduct("")
    }
  }

  const removeProduct = (productToRemove: string) => {
    setProducts((prev) => prev.filter((product) => product !== productToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addProduct()
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Gestionar Productos/Servicios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="newProduct" className="text-slate-300">
            Agregar nuevo producto o servicio
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="newProduct"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="Ej: Pollo, Software de Contabilidad, Clases de Yoga..."
            />
            <Button
              onClick={addProduct}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-slate-300">Productos/Servicios actuales ({products.length})</Label>
          {products.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No tienes productos registrados. Agrega algunos para que aparezcan automáticamente al crear clientes.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2">
              {products.map((product, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:border-slate-500 group"
                >
                  {product}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProduct(product)}
                    className="ml-2 h-4 w-4 p-0 text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
