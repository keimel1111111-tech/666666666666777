"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import type { Client } from "@/components/client-manager"

interface ClientFormProps {
  onAddClient: (client: Omit<Client, "id">) => void
  editingClient?: Client
  onUpdateClient?: (id: string, updates: Partial<Client>) => void
  onCancelEdit?: () => void
  userProducts?: string[] // Accept user's products as props
}

export function ClientForm({
  onAddClient,
  editingClient,
  onUpdateClient,
  onCancelEdit,
  userProducts = [],
}: ClientFormProps) {
  const [formData, setFormData] = useState({
    name: editingClient?.name || "",
    phone: editingClient?.phone || "",
    contactInfo: editingClient?.contactInfo || "",
    paymentDate: editingClient?.paymentDate || "",
    monthlyPrice: editingClient?.monthlyPrice?.toString() || "",
    serviceStatus: editingClient?.serviceStatus || "Activo",
    notes: editingClient?.notes || "",
  })
  const [selectedServices, setSelectedServices] = useState<string[]>(editingClient?.services || [])
  const [availableServices, setAvailableServices] = useState(
    userProducts.length > 0 ? userProducts : ["Producto/Servicio"],
  )
  const [newService, setNewService] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedServices.length === 0) {
      alert("Por favor selecciona al menos un producto o servicio")
      return
    }

    const clientData = {
      name: formData.name,
      phone: formData.phone,
      contactInfo: formData.contactInfo,
      paymentDate: formData.paymentDate,
      services: selectedServices,
      monthlyPrice: Number.parseFloat(formData.monthlyPrice),
      serviceStatus: formData.serviceStatus,
      notes: formData.notes,
      status: "Pendiente" as const,
    }

    if (editingClient && onUpdateClient) {
      onUpdateClient(editingClient.id, clientData)
      onCancelEdit?.()
    } else {
      onAddClient(clientData)
    }

    // Reset form if not editing
    if (!editingClient) {
      setFormData({
        name: "",
        phone: "",
        contactInfo: "",
        paymentDate: "",
        monthlyPrice: "",
        serviceStatus: "Activo",
        notes: "",
      })
      setSelectedServices([])
    }
  }

  const addNewService = () => {
    if (newService.trim() && !availableServices.includes(newService.trim())) {
      setAvailableServices((prev) => [...prev, newService.trim()])
      setNewService("")
    }
  }

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">{editingClient ? "Editar Cliente" : "Agregar Cliente"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-slate-300">
              Nombre del Cliente
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-slate-300">
              Teléfono
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="Ej: +1 234 567 8900"
              required
            />
          </div>

          <div>
            <Label htmlFor="contactInfo" className="text-slate-300">
              Información de Contacto Adicional
            </Label>
            <Input
              id="contactInfo"
              value={formData.contactInfo}
              onChange={(e) => setFormData((prev) => ({ ...prev, contactInfo: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="Email, WhatsApp, etc. (opcional)"
            />
          </div>

          <div>
            <Label htmlFor="paymentDate" className="text-slate-300">
              Fecha de Pago
            </Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, paymentDate: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-slate-300">Productos/Servicios</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableServices.map((service) => (
                <Badge
                  key={service}
                  variant={selectedServices.includes(service) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedServices.includes(service)
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950"
                      : "border-slate-600 text-slate-300 hover:border-slate-500"
                  }`}
                  onClick={() => toggleService(service)}
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Agregar nuevo producto/servicio..."
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addNewService())}
            />
            <Button
              type="button"
              variant="outline"
              onClick={addNewService}
              className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 bg-transparent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor="monthlyPrice" className="text-slate-300">
              Monto Mensual
            </Label>
            <Input
              id="monthlyPrice"
              type="number"
              step="0.01"
              value={formData.monthlyPrice}
              onChange={(e) => setFormData((prev) => ({ ...prev, monthlyPrice: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="serviceStatus" className="text-slate-300">
              Estado del Servicio
            </Label>
            <Select
              value={formData.serviceStatus}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, serviceStatus: value }))}
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Estado del servicio" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="Activo" className="text-white hover:bg-slate-700">
                  Activo
                </SelectItem>
                <SelectItem value="Pausado" className="text-white hover:bg-slate-700">
                  Pausado
                </SelectItem>
                <SelectItem value="Cancelado" className="text-white hover:bg-slate-700">
                  Cancelado
                </SelectItem>
                <SelectItem value="Prueba" className="text-white hover:bg-slate-700">
                  Período de Prueba
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes" className="text-slate-300">
              Notas Adicionales
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="Información adicional sobre el cliente..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 font-bold"
            >
              {editingClient ? "Actualizar Cliente" : "Agregar Cliente"}
            </Button>
            {editingClient && onCancelEdit && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancelEdit}
                className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 bg-transparent"
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
