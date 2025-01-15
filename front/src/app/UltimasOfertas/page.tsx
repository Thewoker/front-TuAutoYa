"use client";

import React from "react";
import { CarCard } from "@/components/HomeMain/CarCard";
import { useGetCars } from "@/api/getCars";
import { ResponseType } from "@/types/response";

const UltimasOfertas: React.FC = () => {
  const {loading, cars} : ResponseType = useGetCars();
  const carsOfertas = cars.filter(car => car.isDiscount) 

  if (loading) {
    return (<div className="max-w-screen-xl mx-auto p-6">
              <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {Array(4).fill(4).map((_, index) => (
                  <div key={index} className="flex-[0_0_auto] animate-pulse">
                    <div className="w-full h-[200px] bg-gray-300 rounded-lg"></div>
                    <div className="mt-4">
                      <div className="w-3/4 h-6 bg-gray-300 rounded-md mb-2"></div>
                      <div className="w-1/2 h-6 bg-gray-300 rounded-md mb-2"></div>
                      <div className="w-2/3 h-6 bg-gray-300 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      )
  }
  
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">
        Aprovecha Las Últimas Ofertas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {carsOfertas.map((car) => (
                <div key={car.id} className="flex-[0_0_auto]">
                  <CarCard {...car} />
                </div>
              ))}
      </div>
    </div>
  );
};

export default UltimasOfertas;
