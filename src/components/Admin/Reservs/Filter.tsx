import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FilterProps } from "@/Interfaces/IReservs"

export default function Filter({ filters, handleFilterChange } : FilterProps) {
    return (
        <>
            <Card className='bg-[#022c22] *:text-white'>
                <CardHeader>
                    <CardTitle>Filtros</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="orderId">ID de Orden</Label>
                            <Input
                                id="orderId"
                                value={filters.orderId}
                                onChange={(e) => handleFilterChange('orderId', e.target.value)}
                                placeholder="Buscar por ID de Orden"
                            />
                        </div>
                        <div>
                            <Label htmlFor="startDate">Fecha de Inicio</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                className='text-muted-foreground'
                            />
                        </div>
                        <div>
                            <Label htmlFor="endDate">Fecha de Fin</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                className='text-muted-foreground'
                            />
                        </div>
                        <div>
                            <Label htmlFor="carBrand">Marca del Vehículo</Label>
                            <Input
                                id="carBrand"
                                value={filters.carBrand}
                                onChange={(e) => handleFilterChange('carBrand', e.target.value)}
                                placeholder="Buscar por marca"
                            />
                        </div>
                        <div>
                            <Label htmlFor="carModel">Modelo del Vehículo</Label>
                            <Input
                                id="carModel"
                                value={filters.carModel}
                                onChange={(e) => handleFilterChange('carModel', e.target.value)}
                                placeholder="Buscar por modelo"
                            />
                        </div>
                        <div>
                            <Label htmlFor="userName">Nombre Cliente/Propietario</Label>
                            <Input
                                id="userName"
                                value={filters.userName}
                                onChange={(e) => handleFilterChange('userName', e.target.value)}
                                placeholder="Buscar por nombre"
                            />
                        </div>
                        <div>
                            <Label htmlFor="userEmail">Email Cliente/Propietario</Label>
                            <Input
                                id="userEmail"
                                value={filters.userEmail}
                                onChange={(e) => handleFilterChange('userEmail', e.target.value)}
                                placeholder="Buscar por email"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
