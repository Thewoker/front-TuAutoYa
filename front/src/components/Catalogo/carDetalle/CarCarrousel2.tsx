"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { CarCard } from '@/components/HomeMain/CarCard'
import { useCallback, useState } from 'react'

import Link from 'next/link'
import data from '@/helpers/data'
import ICars from '@/Interfaces/ICars'
import Car from '@/Interfaces/ICar'

interface CarCarouselProps {
    filtro: string;
    title: string;
    carid: string;
}

export function CarCarousel2({ carid, filtro, title }: CarCarouselProps) {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/cars');
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
    // const cars = data.find(item => item.cars)?.cars || []
    const fils = cars.filter(car => car.model === filtro && car.id !== carid) 
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
            <h2 className='text-xl'><b>{title}</b></h2>
            <Link href="/catalogo">
                <p className='text-emerald-900npm run d hover:underline text-sm'>Ve nuestro catalogo</p>
            </Link>
            </div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 p-4">
                    {fils.map((car) => (
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

