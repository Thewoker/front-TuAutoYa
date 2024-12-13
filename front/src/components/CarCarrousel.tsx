'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CarCard } from './CarCard'
import { useCallback } from 'react'
import Link from 'next/link'
import data from '@/helpers/data'

export function CarCarousel() {
    const cars = data.find(item => item.cars)?.cars || []
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        skipSnaps: false,
        dragFree: true
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="relative w-full">
            <div className='flex justify-between'>
            <h2 className='text-xl'><b>Todos nuestros proveedores</b></h2>
            <Link href="/catalogo">
                <p className='text-blue-600 hover:underline text-sm'>Ve nuestro catalogo</p>
            </Link>
            </div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 p-4">
                    {cars.map((car) => (
                        <div key={car.id} className="flex-[0_0_auto]">
                            <CarCard {...car} />
                        </div>
                    ))}
                </div>
            </div>
            <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg"
                onClick={scrollPrev}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg"
                onClick={scrollNext}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

