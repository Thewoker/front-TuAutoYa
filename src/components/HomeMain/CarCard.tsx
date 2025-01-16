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
    kilometer,
    brakes,
    fuelType,
    rating,
    discount
}: CarProps) {
    return (
        <Card className="w-[300px] overflow-hidden bg-amber-500 relative">
            {discount > 0 && 
                <div className="z-10 absolute top-2 right-2 bg-emerald-950 text-white text-xs font-bold px-2 py-1 rounded shadow">
                    ¡Oferta {discount}%!
                </div>
            }
            <div className="relative h-[200px] w-full">
                <Link href={`/catalogo/${id}`}>
                    <Image
                        src={image || `/placeholder.svg?height=200&width=300`}
                        alt={model}
                        fill
                        className="object-cover"
                    />
                </Link>
            </div>
            <div className="p-4">
                <div className="mb-2  text-zinc-200">
                    <span className="text-sm  text-emerald-900 ">{brand}</span>
                </div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="flex-auto font-semibold text-lg text-emerald-900 ">{model}</h3>
                    <div className="text-right">
                        {discount > 0 ? (
                            <div className="flex gap-1 items-center">
                                <span className="flex-auto text-sm line-through text-zinc-600">
                                    ${pricePerDay}
                                </span>
                                <br />
                                <div>
                                    <span className="flex-auto text-xl font-bold text-amber-600">
                                        ${Math.round(parseFloat(pricePerDay) * (1 - discount / 100))}
                                    </span>
                                    <span className="text-sm text-muted-foreground">/día</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <span className="text-xl font-bold text-amber-600">
                                    ${pricePerDay}
                                </span>
                                <span className="text-sm text-muted-foreground">/día</span>
                            </>

                        )}
                        {/* <span className="text-xl font-bold text-amber-600">${pricePerDay}</span> */}
                        {/* <span className="text-sm text-muted-foreground">/día</span> */}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-zinc-200">{transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground text-zinc-200" />
                        <span className="text-sm">{kilometer}</span>
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
                        <span className="font-semibold">Reviews: {rating}</span>
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    </div>
                    <Link
                        href={`/catalogo/${id}`}
                        className="text-sm font-medium text-emerald-900 hover:underline"
                    >
                        Ver Detalles
                    </Link>
                </div>
            </div>
        </Card>
    )
}

