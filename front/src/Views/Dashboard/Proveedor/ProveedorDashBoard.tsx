'use client'

import { useState } from 'react'
import { CarCard } from '@/components/dashboard/Proveedor/InfoOwnerCar'
import { AddCarForm } from '@/components/dashboard/Proveedor/CreateCarForm'
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Car {
    id: string
    model: string
    brand: string
    price: number
    description: string
    image: string
    year: number
    stock: number
}

export default function CarManagement() {
    const [cars, setCars] = useState<Car[]>([
    ])

    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleEdit = (id: string) => {
        console.log('Editar auto con id:', id)
    }

    const handleDelete = (id: string) => {
        setCars(cars.filter(car => car.id !== id))
    }

    const handleAddCar = (data: Omit<Car, 'id'>) => {
        const newCar = {
            ...data,
            id: Date.now().toString(),
        }
        setCars(prevCars => [...prevCars, newCar])
        setIsFormOpen(false)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard del Propietario</h1>
            <Collapsible
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                className="mb-4 border rounded-md p-4"
            >
                <CollapsibleTrigger asChild>
                    <Button className="w-full flex justify-between items-center">
                        {isFormOpen ? 'Cerrar formulario' : 'Agregar Nuevo Auto'}
                        {isFormOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 overflow-hidden transition-all duration-300 ease-in-out">
                    <div className="animate-slideDown">
                        <AddCarForm onSubmit={handleAddCar} />
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map(car => (
                    <CarCard
                        key={car.id}
                        {...car}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    )
}

