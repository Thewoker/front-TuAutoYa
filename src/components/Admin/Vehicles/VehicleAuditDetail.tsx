import React from 'react'
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Star, Gauge, Car, Disc, Fuel } from 'lucide-react'
import { ICarProps } from "@/Interfaces/IAuditVehicles"
import { Button } from "@/components/ui/button"

export default function VehicleAuditDetail({ car, onStatusChange }: ICarProps) {
    return (
        <>
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <Image
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 bg-[#f59e0b]">
                <CardTitle className="flex justify-between items-center mb-2">
                    <span>{car.brand} {car.model}</span>
                    <Badge variant="secondary">{car.year}</Badge>
                </CardTitle>
                <p className="text-sm text-gray-500 mb-4">{car.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{car.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{car.kilometer} km</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Disc className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{car.brakes}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{car.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">${car.pricePerDay}/día</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 bg-[#f59e0b]/80 flex flex-col items-start">
                <div className="w-full mb-4">
                    <h3 className="font-semibold mb-2">Propietario</h3>
                    <p className="text-sm"><span className="font-medium">Nombre:</span> {car.users.name}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {car.users.email}</p>
                    <p className="text-sm"><span className="font-medium">Ciudad:</span> {car.users.city}</p>
                </div>
                <div className="w-full">
                    <h3 className="font-semibold mb-2">Estado de Aprobación</h3>
                    <Badge variant={car.approvalStatus === 'approved' ? 'default' : car.approvalStatus === 'rejected' ? 'destructive' : 'secondary'}>
                        {car.approvalStatus}
                    </Badge>
                    <div className="flex gap-2 mt-2">
                        <Button 
                            size="sm" 
                            onClick={() => onStatusChange(car.id, 'approved')}
                            disabled={car.approvalStatus === 'approved'}
                        >
                            Aprobar
                        </Button>
                        <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => onStatusChange(car.id, 'rejected')}
                            disabled={car.approvalStatus === 'rejected'}
                        >
                            Rechazar
                        </Button>
                        <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onStatusChange(car.id, 'pending')}
                            disabled={car.approvalStatus === 'pending'}
                        >
                            Pendiente
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </>
    )
}

