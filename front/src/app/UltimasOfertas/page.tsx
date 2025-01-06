"use client";

import React, { useState } from "react";
import data from "@/helpers/data";
import Car from "@/Interfaces/Car";
import Image from "next/image"; // Importa el componente Image de Next.js

const UltimasOfertas: React.FC = () => {
  const [favorites, setFavorites] = useState<Car[]>([]); // Especifica el tipo de estado

  const addFavorite = (car: Car) => {
    setFavorites((prevFavorites) => [...prevFavorites, car]);
  };

  // Obtener los autos y seleccionar solo los tres últimos
  const cars = data.find((item) => item.cars)?.cars?.slice(-3) || [];

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">
        Nuestras ofertas navideñas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* Contenedor de la imagen */}
            <div className="w-full h-48 overflow-hidden">
              <Image
                src={car.img}
                alt={car.model}
                width={500} // Especifica el ancho de la imagen
                height={300} // Especifica la altura de la imagen
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Contenido de la tarjeta */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-emerald-900 mb-4">
                {car.brand} {car.model} {car.year}
              </h3>
              <p className="text-gray-600 text-sm">{car.description}</p>
              <p className="mt-2 font-semibold text-amber-500">
                Precio por día: ${car.pricePerDay}
              </p>
              <button
                onClick={() => addFavorite(car)}
                className="mt-4 bg-amber-400 text-white px-4 py-2 rounded hover:bg-sky-500 transition"
              >
                Agregar a Favoritos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UltimasOfertas;
