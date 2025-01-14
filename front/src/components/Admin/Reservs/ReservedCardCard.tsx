import React from 'react'
import { CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import Image from 'next/image'
import { OrderProps } from "@/Interfaces/IReservs"

interface ReservedCardCardProps extends OrderProps {
  onCancelOrder: (orderId: string) => void;
}

export default function ReservedCardCard({ order, onCancelOrder }: ReservedCardCardProps) {
    return (
        <>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Orden #{order?.id}</span>
                    <Badge>{order?.status}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">Detalles de la Orden</h3>
                            <p><span className="font-semibold">Fecha de Orden:</span> {format(new Date(order?.orderDate), 'dd/MM/yyyy HH:mm')}</p>
                            <p><span className="font-semibold">Fecha de Inicio:</span> {format(new Date(order?.startDate), 'dd/MM/yyyy HH:mm')}</p>
                            <p><span className="font-semibold">Fecha de Fin:</span> {format(new Date(order?.endDate), 'dd/MM/yyyy HH:mm')}</p>
                            <p><span className="font-semibold">Precio:</span> ${order?.price}</p>
                            <p><span className="font-semibold">Subtotal:</span> ${order?.subtotal}</p>
                            <p><span className="font-semibold">Estado:</span> {order?.status}</p>
                            <p><span className="font-semibold">Estado de Pago:</span> {order?.paymentStatus}</p>
                        </div>
                    </div>
                    {order.cars && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">Detalles del Vehículo</h3>
                                <div className="relative h-40 w-full mb-2">
                                    <Image
                                        src={order.cars.image || "/placeholder.svg"}
                                        alt={`${order.cars.brand} ${order.cars.model}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                                <p><span className="font-semibold">Marca:</span> {order.cars.brand}</p>
                                <p><span className="font-semibold">Modelo:</span> {order.cars.model}</p>
                                <p><span className="font-semibold">Año:</span> {order.cars.year}</p>
                                <p><span className="font-semibold">Transmisión:</span> {order.cars.transmission}</p>
                                <p><span className="font-semibold">Combustible:</span> {order.cars.fuelType}</p>
                                <p><span className="font-semibold">Kilometraje:</span> {order.cars.kilometer}</p>
                                <p><span className="font-semibold">Calificación:</span> {order.cars.rating}/5</p>
                                <p><span className="font-semibold">Estado:</span> {order.cars.status}</p>
                                <p><span className="font-semibold">Estado de Aprobación:</span> {order.cars.approvalStatus}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Detalles del Propietario</h3>
                                <p><span className="font-semibold">Nombre:</span> {order.cars.users.name || 'N/A'}</p>
                                <p><span className="font-semibold">Email:</span> {order.cars.users.email}</p>
                                <p><span className="font-semibold">Teléfono:</span> {order.cars.users.phone || 'N/A'}</p>
                                <p><span className="font-semibold">Ciudad:</span> {order.cars.users.city || 'N/A'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button 
                    onClick={() => onCancelOrder(order.id)} 
                    variant="destructive"
                    disabled={order.status !== 'active'}
                >
                    Cancelar Orden
                </Button>
            </CardFooter>
        </>
    )
}

