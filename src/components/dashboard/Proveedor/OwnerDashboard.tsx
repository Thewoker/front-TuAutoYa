'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddCarForm } from './AddCarForm'
import { CarCard } from './CarCard'
import axios from 'axios'
import { Car, User } from  "@/Interfaces/ICreateCar"



export default function OwnerDashboard() {
  const [cars, setCars] = useState<Car[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cars = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cars`)

        setCars(cars.data)
        const { data } = await axios.get('/api/getUserData')
        if (!data) {
          throw new Error('Failed to fetch user data')
        }
        setUserData(JSON.parse(data))
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleAddCar = async (newCar: Omit<Car, 'id' | 'users'>) => {
    if (!userData) {
      console.error('User data not available')
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newCar,
          user: userData,
          userId: userData.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add car')
      }

      const addedCar = await response.json()
      setCars([...cars, addedCar])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding car:', error)
    }
  }

  const handleDeleteCar = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete car')
      }

      setCars(cars.filter(car => car.id !== id))
    } catch (error) {
      console.error('Error deleting car:', error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Vehículos</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className='bg-[#022c22]' onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancelar' : 'Agregar Nuevo Vehículo'}
          </Button>

          {showAddForm && userData && (
            <div className="mt-4">
              <AddCarForm onSubmit={handleAddCar} userData={userData} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {cars.map(car => (
              <CarCard
                key={car.id}
                car={car}
                onDelete={() => handleDeleteCar(car.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

