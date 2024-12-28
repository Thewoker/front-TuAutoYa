'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { ICar } from "@/Interfaces/IAuditVehicles"
import VehicleAuditDetail from '@/components/Admin/Vehicles/VehicleAuditDetail';

export default function VehicleView() {
    const [cars, setCars] = useState<ICar[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/cars');
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Cargando vehículos...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Vehículos Disponibles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <Card key={car.id} className="overflow-hidden">
                        <VehicleAuditDetail car={car} />
                    </Card>
                ))}
            </div>
        </div>
    );
}
