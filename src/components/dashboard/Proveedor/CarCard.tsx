import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { CarCardProps } from "@/Interfaces/ICreateCar"


export function CarCard({ car, onDelete }: CarCardProps) {
  return (
    <Card className="bg-[#f59e0b]">
      <CardHeader>
        <CardTitle>{car.brand} {car.model}</CardTitle>
      </CardHeader>
      <CardContent>
          <Badge variant={car.status === 'active' ? 'default' : 'secondary'} className="mb-3">{car.status}</Badge>
        <div className="aspect-video relative mb-4">
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <p className="text-sm text-gray-500 mb-2">{car.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p><strong>Año:</strong> {car.year}</p>
          <p><strong>Precio/día:</strong> ${car.pricePerDay}</p>
          <p><strong>Transmisión:</strong> {car.transmission}</p>
          <p><strong>Combustible:</strong> {car.fuelType}</p>
          <p><strong>Kilometraje:</strong> {car.kilometer}</p>
          <p><strong>Frenos:</strong> {car.brakes}</p>
          <p><strong>Calificación:</strong> {car.rating}/5</p>
        </div>
        <div className="mt-4">
          <p className="text-sm"><strong>Propietario:</strong> {car.users.name || car.users.email}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={onDelete}>Eliminar</Button>
      </CardFooter>
    </Card>
  )
}

