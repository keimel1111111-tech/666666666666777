"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Trash2, MessageCircle, Edit } from "lucide-react"
import type { Client } from "@/components/client-manager"

interface ClientListProps {
  clients: Client[]
  onUpdateClient: (id: string, updates: Partial<Client>) => void
  onDeleteClient: (id: string) => void
  onMarkAsPaid: (id: string) => void
  onEditClient: (client: Client) => void // Added edit client function prop
}

export function ClientList({ clients, onUpdateClient, onDeleteClient, onMarkAsPaid, onEditClient }: ClientListProps) {
  const sendWhatsApp = (client: Client) => {
    const message = `Hola ${client.name},

Se ha generado su pago de los siguientes productos/servicios: ${client.services.join(", ")} con un precio mensual de $${client.monthlyPrice}.

Por favor, realice su pago lo más pronto posible.

Cuentas bancarias para depositar:
Banco Reserva: 9601301707
Banco Popular: 829082106`

    const encodedMessage = encodeURIComponent(message)
    // Use client's phone if available, otherwise open WhatsApp web
    const phoneNumber = client.phone ? client.phone.replace(/\D/g, "") : ""
    const whatsappURL = phoneNumber
      ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`
    window.open(whatsappURL, "_blank")
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Lista de Clientes ({clients.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {clients.length === 0 ? (
          <div className="text-center py-8 text-slate-400">No hay clientes registrados</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Nombre</TableHead>
                  <TableHead className="text-slate-300">Teléfono</TableHead>
                  <TableHead className="text-slate-300">Fecha</TableHead>
                  <TableHead className="text-slate-300">Productos/Servicios</TableHead>
                  <TableHead className="text-slate-300">Precio</TableHead>
                  <TableHead className="text-slate-300">Estado Servicio</TableHead>
                  <TableHead className="text-slate-300">Estado Pago</TableHead>
                  <TableHead className="text-slate-300">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className="border-slate-700">
                    <TableCell className="text-white font-medium">{client.name}</TableCell>
                    <TableCell className="text-slate-300">{client.phone}</TableCell>
                    <TableCell className="text-slate-300">
                      {new Date(client.paymentDate).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {client.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">${client.monthlyPrice}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          client.serviceStatus === "Activo"
                            ? "border-green-600 text-green-400"
                            : client.serviceStatus === "Pausado"
                              ? "border-yellow-600 text-yellow-400"
                              : "border-red-600 text-red-400"
                        }`}
                      >
                        {client.serviceStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={client.status === "Pagado" ? "default" : "destructive"}
                        className={
                          client.status === "Pagado" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {client.status === "Pendiente" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onMarkAsPaid(client.id)}
                            className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEditClient(client)}
                          className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendWhatsApp(client)}
                          className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                        >
                          <MessageCircle className="h-3 w-3" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDeleteClient(client.id)}
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
