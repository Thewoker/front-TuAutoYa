import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CarCardProps {
  id: string
  model: string
  brand: string
  price: number
  description: string
  image: string
  year: number
  stock: number
  onDelete: () => void
}

export function CarCard({ id, model, brand, price, description, image, year, stock, onDelete }: CarCardProps) {
  return (
    <Card className="w-full">
      <img src={image} alt={`${brand} ${model}`} className="w-full h-48 object-cover" />
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{brand} {model}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <p className="text-sm mt-2">Año: {year}</p>
        <p className="text-sm">Stock: {stock}</p>
        <p className="text-lg font-semibold mt-2">${price}/día</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button variant="destructive" onClick={onDelete}>Eliminar</Button>
      </CardFooter>
    </Card>
  )
}

