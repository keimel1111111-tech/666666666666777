"use client"

import { useState, useEffect } from "react"
import { ClientForm } from "@/components/client-form"
import { ClientList } from "@/components/client-list"
import { MonthFilter } from "@/components/month-filter"
import { ProductManager } from "@/components/product-manager"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"

export interface Client {
  id: string
  name: string
  phone: string
  contactInfo: string
  paymentDate: string
  services: string[] // Now represents any products/services instead of debt types
  monthlyPrice: number
  serviceStatus: string
  notes: string
  status: "Pagado" | "Pendiente"
}

export function ClientManager() {
  const { user } = useAuth()
  const [clients, setClients] = useState<Client[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [editingClient, setEditingClient] = useState<Client | undefined>()

  // Load clients from localStorage on mount
  useEffect(() => {
    const savedClients = localStorage.getItem("keitel-clients")
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }

    // Set current month as default
    const currentMonth = new Date().toLocaleString("es-ES", { month: "long" }).toLowerCase()
    setSelectedMonth(currentMonth)
  }, [])

  // Save clients to localStorage whenever clients change
  useEffect(() => {
    localStorage.setItem("keitel-clients", JSON.stringify(clients))
  }, [clients])

  const addClient = (clientData: Omit<Client, "id">) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
    }
    setClients((prev) => [...prev, newClient])
  }

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) => prev.map((client) => (client.id === id ? { ...client, ...updates } : client)))
    setEditingClient(undefined)
  }

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id))
  }

  const startEditingClient = (client: Client) => {
    setEditingClient(client)
  }

  const cancelEdit = () => {
    setEditingClient(undefined)
  }

  const markAsPaid = (id: string) => {
    const client = clients.find((c) => c.id === id)
    if (!client) return

    // Update current client status
    updateClient(id, { status: "Pagado" })

    // Create next month's client
    const currentDate = new Date(client.paymentDate)
    currentDate.setMonth(currentDate.getMonth() + 1)
    const nextMonthDate = currentDate.toISOString().split("T")[0]

    const nextMonthClient: Client = {
      ...client,
      id: Date.now().toString(),
      paymentDate: nextMonthDate,
      status: "Pendiente",
    }

    setClients((prev) => [...prev, nextMonthClient])
  }

  const filteredClients = selectedMonth
    ? clients.filter((client) => {
        const paymentDate = new Date(client.paymentDate)
        const paymentMonth = paymentDate.toLocaleString("es-ES", { month: "long" }).toLowerCase()
        return paymentMonth === selectedMonth
      })
    : clients

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <Tabs defaultValue="clients" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                <TabsTrigger value="clients" className="text-slate-300 data-[state=active]:text-white">
                  Gestión de Clientes
                </TabsTrigger>
                <TabsTrigger value="products" className="text-slate-300 data-[state=active]:text-white">
                  Gestión de Productos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="clients" className="space-y-6">
                <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ClientForm
                    onAddClient={addClient}
                    editingClient={editingClient}
                    onUpdateClient={updateClient}
                    onCancelEdit={cancelEdit}
                    userProducts={user?.products || []}
                  />
                  <ClientList
                    clients={filteredClients}
                    onUpdateClient={updateClient}
                    onDeleteClient={deleteClient}
                    onMarkAsPaid={markAsPaid}
                    onEditClient={startEditingClient}
                  />
                </div>
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <ProductManager />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </section>
  )
}
