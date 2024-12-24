// src/app/UltimasOfertas/page.tsx
"use client"; // Si estás usando React 18 y Server Components

import React, { useState } from "react";
import data from "@/helpers/data";
import Car from '@/Interfaces/Car'; // Importa los datos

const UltimasOfertas: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addFavorite = (car: Car) => {
    setFavorites([...favorites, car]);
  };

  // Obtener los autos y seleccionar solo los tres últimos
  const cars = data.find(item => item.cars)?.cars?.slice(-3) || [];  // Usamos el encadenamiento opcional (?.)

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-emerald-900"> Nuestras ofertas navideñas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="car-card bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Contenedor de la imagen con clases para asegurar que se vea completa */}
            <div className="w-full h-48">
              <img
                src={car.img}
                alt={car.model}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{car.brand} {car.model} {car.year}</h3>
              <p className="text-sm text-gray-600">{car.description}</p>
              <p className="mt-2 font-semibold">Precio por día: ${car.pricePerDay}</p>
              <button
                onClick={() => addFavorite(car)}
                className="mt-4 bg-amber-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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
