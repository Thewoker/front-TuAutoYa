import { Card } from "@/components/ui/card"
import ICars from "@/Interfaces/ICars"
import { Star, Gauge, Car, Disc, Fuel } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"


export function CarCard({
    id,
    brand,
    model,
    pricePerDay,
    img,
    transmission,
    mileage,
    brakes,
    fuelType,
    rating,
}: ICars) {
    return (
        <Card className="w-[300px] overflow-hidden bg-amber-500">
            <div className="relative h-[200px] w-full">
                <Image
                    src={img}
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
                        <span className="text-xl font-bold text-zinc-200">${pricePerDay}</span>
                        <span className="text-sm text-muted-foreground text-zinc-200">/Hr</span>
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
                        <span className="font-semibold  text-zinc-200">Reviews: {rating}</span>
                        <Star className="h-4 w-4 fill-amber-500  text-amber-500" />
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

