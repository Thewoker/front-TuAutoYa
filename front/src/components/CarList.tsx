'use client'
import ICars from "@/Interfaces/ICars";
import { CarCard } from "./CarCard";

interface ICarProps{
    cars:ICars[]
}

export function CarList({cars}: ICarProps){
    return(
        <div className="relative w-full">
            <div className="mx-auto px-2 sm:px-6 lg:px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <div key={car.id} className="flex-[0_0_auto]">
                            <CarCard {...car} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}