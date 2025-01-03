import React from 'react'
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import Image from 'next/image'
import { OrderProps } from "@/Interfaces/IReservs"

export default function ReservedCardCard({ order } : OrderProps) {
    return (
        <>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Orden #{order.id}</span>
                        <Badge>{order.users.role === 'customer' ? 'Cliente' : 'Propietario'}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">Detalles de la Orden</h3>
                                <p><span className="font-semibold">Fecha de Orden:</span> {format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm')}</p>
                                <p><span className="font-semibold">Fecha de Inicio:</span> {format(new Date(order.orderDetails.startDate), 'dd/MM/yyyy HH:mm')}</p>
                                <p><span className="font-semibold">Fecha de Fin:</span> {format(new Date(order.orderDetails.endDate), 'dd/MM/yyyy HH:mm')}</p>
                                <p><span className="font-semibold">Precio por Día:</span> ${order.orderDetails.price}</p>
                                <p><span className="font-semibold">Subtotal:</span> ${order.orderDetails.subtotal}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Detalles del Cliente</h3>
                                <p><span className="font-semibold">Nombre:</span> {order.users.name}</p>
                                <p><span className="font-semibold">Email:</span> {order.users.email}</p>
                                <p><span className="font-semibold">Ciudad:</span> {order.users.city}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">Detalles del Veh��culo</h3>
                                <div className="relative h-40 w-full mb-2">
                                    <Image
                                        src={order.orderDetails.cars.image}
                                        alt={`${order.orderDetails.cars.brand} ${order.orderDetails.cars.model}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                                <p><span className="font-semibold">Marca:</span> {order.orderDetails.cars.brand}</p>
                                <p><span className="font-semibold">Modelo:</span> {order.orderDetails.cars.model}</p>
                                <p><span className="font-semibold">Año:</span> {order.orderDetails.cars.year}</p>
                                <p><span className="font-semibold">Transmisión:</span> {order.orderDetails.cars.transmission}</p>
                                <p><span className="font-semibold">Combustible:</span> {order.orderDetails.cars.fuelType}</p>
                                <p><span className="font-semibold">Kilometraje:</span> {order.orderDetails.cars.kilometer}</p>
                                <p><span className="font-semibold">Calificación:</span> {order.orderDetails.cars.rating}/5</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Detalles del Propietario</h3>
                                <p><span className="font-semibold">Nombre:</span> {order.orderDetails.cars.users.name}</p>
                                <p><span className="font-semibold">Email:</span> {order.orderDetails.cars.users.email}</p>
                                <p><span className="font-semibold">Ciudad:</span> {order.orderDetails.cars.users.city}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
        </>
    )
}
