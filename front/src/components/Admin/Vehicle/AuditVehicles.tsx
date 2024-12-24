'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Gauge, Car, Disc, Fuel } from 'lucide-react'
import Image from "next/image"

interface IUser {
  id: string;
  name: string;
  email: string;
  identity: number;
  phone: string;
  city: string;
  role: string;
}

interface ICar {
  id: string;
  brand: string;
  model: string;
  year: string;
  pricePerDay: number;
  image: string;
  description: string;
  transmission: string;
  fuelType: string;
  kilometer: string;
  brakes: string;
  rating: number;
  status: string;
  users: IUser;
}

export function AuditVehicles() {
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
            <CardContent className="p-4">
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
            <CardFooter className="bg-gray-50 p-4">
              <div className="w-full">
                <h3 className="font-semibold mb-2">Propietario</h3>
                <p className="text-sm"><span className="font-medium">Nombre:</span> {car.users.name}</p>
                <p className="text-sm"><span className="font-medium">Email:</span> {car.users.email}</p>
                <p className="text-sm"><span className="font-medium">Ciudad:</span> {car.users.city}</p>
                <Button className="w-full mt-4">Informe del vehículo</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

