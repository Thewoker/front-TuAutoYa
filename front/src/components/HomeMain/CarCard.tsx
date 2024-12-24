import { Card } from "@/components/ui/card"
import { Star, Gauge, Car, Disc, Fuel } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import CarProps from "@/Interfaces/ICarProps"


export function CarCard({
    id,
    brand,
    model,
    pricePerDay,
    image,
    transmission,
    mileage,
    brakes,
    fuelType,
    rating,
}: CarProps) {
    return (
        <Card className="w-[300px] overflow-hidden bg-amber-500">
            <div className="relative h-[200px] w-full">
                <Image
                    src={image || `/placeholder.svg?height=200&width=300`}
                    alt={model}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <div className="mb-2  text-zinc-200">
                    <span className="text-sm  text-emerald-900 ">{brand}</span>
                </div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-emerald-900 ">{model}</h3>
                    <div className="text-right">
<<<<<<< HEAD:front/src/components/CarCard.tsx
                        <span className="text-xl font-bold text-zinc-200">${pricePerDay}</span>
                        <span className="text-sm text-muted-foreground text-zinc-200">/Hr</span>
=======
                        <span className="text-xl font-bold text-amber-600">${pricePerDay}</span>
                        <span className="text-sm text-muted-foreground">/día</span>
>>>>>>> 2ae97e6a8e6022ce6d1b94b1aa2d3bbcdcce19d1:front/src/components/HomeMain/CarCard.tsx
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-zinc-200">{transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground text-zinc-200" />
                        <span className="text-sm">{mileage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Disc className="h-4 w-4 text-muted-foreground text-zinc-200" />
                        <span className="text-sm">{brakes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-muted-foreground text-zinc-200" />
                        <span className="text-sm">{fuelType}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center gap-1">
<<<<<<< HEAD:front/src/components/CarCard.tsx
                        <span className="font-semibold  text-zinc-200">Reviews: {rating}</span>
                        <Star className="h-4 w-4 fill-amber-500  text-amber-500" />
=======
                        <span className="font-semibold">Reviews: {rating}</span>
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
>>>>>>> 2ae97e6a8e6022ce6d1b94b1aa2d3bbcdcce19d1:front/src/components/HomeMain/CarCard.tsx
                    </div>
                    <Link
                        href={`/catalogo/${id}`}
                        className="text-sm font-medium text-emerald-900 hover:underline"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </Card>
    )
}

