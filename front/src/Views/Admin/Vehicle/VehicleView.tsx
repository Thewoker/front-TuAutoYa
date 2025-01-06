'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from "@/components/ui/card"
import { ICar } from "@/Interfaces/IAuditVehicles"
import VehicleAuditDetail from '@/components/Admin/Vehicles/VehicleAuditDetail'
import { useToast } from "@/hooks/use-toast"

export default function VehicleView() {
    const [cars, setCars] = useState<ICar[]>([])
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    useEffect(() => {
        fetchCars()
    }, [])

    const fetchCars = async () => {
        try {
            const response = await axios.get<ICar[]>(`${process.env.NEXT_PUBLIC_API_URL}/cars`)
            setCars(response.data)
        } catch (error) {
            console.error('Error fetching cars:', error)
            toast({
                title: "Error",
                description: "Failed to fetch cars. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (carId: string, newStatus: 'pending' | 'approved' | 'rejected') => {
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`, {
                approvalStatus: newStatus
            })

            setCars(cars.map(car => 
                car.id === carId ? { ...car, approvalStatus: newStatus } : car
            ))

            toast({
                title: "Success",
                description: `Car status updated to ${newStatus}`,
            })
        } catch (error) {
            console.error('Error updating car status:', error)
            toast({
                title: "Error",
                description: "Failed to update car status. Please try again.",
                variant: "destructive",
            })
        }
    }

    if (loading) {
        return <div className="text-center py-10">Cargando vehículos...</div>
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Vehículos Disponibles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <Card key={car.id} className="overflow-hidden">
                        <VehicleAuditDetail car={car} onStatusChange={handleStatusChange} />
                    </Card>
                ))}
            </div>
        </div>
    )
}

