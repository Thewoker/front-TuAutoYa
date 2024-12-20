import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddCarForm } from './AddCarForm'
import { CarCard } from './CarCard'

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

export default function OwnerDashboard() {
  const [cars, setCars] = useState<Car[]>([
    {
      id: '1',
      model: 'Model 3',
      brand: 'Tesla',
      price: 150,
      description: 'Vehículo eléctrico de alta gama',
      image: '/placeholder.svg?height=200&width=300',
      year: 2023,
      stock: 5,
    },
    // Add more sample cars as needed
  ])

  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddCar = (newCar: Omit<Car, 'id'>) => {
    const carWithId = { ...newCar, id: Date.now().toString() }
    setCars([...cars, carWithId])
    setShowAddForm(false)
  }

  const handleDeleteCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Vehículos</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancelar' : 'Agregar Nuevo Vehículo'}
          </Button>
          
          {showAddForm && (
            <div className="mt-4">
              <AddCarForm onSubmit={handleAddCar} />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {cars.map(car => (
              <CarCard
                key={car.id}
                {...car}
                onDelete={() => handleDeleteCar(car.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

