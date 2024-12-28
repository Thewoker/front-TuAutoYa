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
      image: 'https://www.usnews.com/object/image/0000018c-5f08-dc6c-aded-ffbc687b0000/https-cars-dms-usnews-com-static-uploads-images-auto-custom-15203-original-2023-tesla-model-3-angular-front-1.jpg?update-time=1684170388000&size=responsiveGallery',
      year: 2023,
      stock: 5,
    },
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

