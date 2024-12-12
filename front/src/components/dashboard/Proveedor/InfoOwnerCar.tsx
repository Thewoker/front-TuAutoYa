import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface CarCardProps {
    id: string
    model: string
    brand: string
    price: number
    description: string
    image: string
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

export function CarCard({ id, model, brand, price, description, image, onEdit, onDelete }: CarCardProps) {
    return (
        <Card className="w-full max-w-sm">
            <img src={image} alt={`${brand} ${model}`} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
                <h3 className="text-lg font-bold">{brand} {model}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
                <p className="text-lg font-semibold mt-2">${price}/día</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
                <Button variant="outline" size="icon" onClick={() => onEdit(id)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente tu auto de la lista de alquiler.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(id)}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}

