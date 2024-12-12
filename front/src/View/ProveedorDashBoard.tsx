'use client'

import { useState } from 'react'
import { CarCard } from '@/components/dashboard/Proveedor/InfoOwnerCar'
import { AddCarForm } from '@/components/dashboard/Proveedor/CreateCarForm'
import { Button } from "@/components/ui/button"

interface Car {
    id: string
    model: string
    brand: string
    price: number
    description: string
    image: string
}

export default function Dashboard() {
    const [cars, setCars] = useState<Car[]>([
        {
            id: '1',
            model: 'Model 3',
            brand: 'Tesla',
            price: 150,
            description: 'Vehículo eléctrico de alta gama',
            image: '/placeholder.svg?height=300&width=400',
        },
        // Puedes agregar más autos aquí
    ])

    const [showAddForm, setShowAddForm] = useState(false)

    const handleEdit = (id: string) => {
        // Implementar lógica de edición
        console.log('Editar auto con id:', id)
    }

    const handleDelete = (id: string) => {
        setCars(cars.filter(car => car.id !== id))
    }

    const handleAddCar = (data: Omit<Car, 'id'>) => {
        const newCar = {
            ...data,
            id: Date.now().toString(),
            price: Number(data.price),
        }
        setCars([...cars, newCar])
        setShowAddForm(false)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard del Propietario</h1>
            <div className="mb-4">
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Cancelar' : 'Agregar Nuevo Auto'}
                </Button>
            </div>
            {showAddForm && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Auto</h2>
                    <AddCarForm onSubmit={handleAddCar} />
                </div>
            )}
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

