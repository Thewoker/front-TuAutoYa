"use client";

import React, { useState } from "react";

interface Car {
  id: string;
  name: string;
  image: string;
  description: string;
}

const Favoritos: React.FC = () => {
  // Estado local para los carros favoritos
  const [favoriteCars, setFavoriteCars] = useState<Car[]>([
    // Datos de ejemplo iniciales
    {
      id: "1",
      name: "Carro Deportivo",
      image: "/images/sports-car.jpg",
      description: "Un carro deportivo rápido y moderno.",
    },
    {
      id: "2",
      name: "SUV Familiar",
      image: "/images/suv.jpg",
      description: "Un SUV cómodo y espacioso para la familia.",
    },
  ]);

  // Función para eliminar un carro de favoritos
  const removeFavorite = (id: string) => {
    setFavoriteCars((prevFavorites) =>
      prevFavorites.filter((car) => car.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-amber-500 mb-6">
        Mis Favoritos
      </h1>
      {favoriteCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoriteCars.map((car) => (
            <div
              key={car.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800">
                {car.name}
              </h2>
              <p className="text-gray-600 mt-2">{car.description}</p>
              <button
                onClick={() => removeFavorite(car.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">
          No tienes carros guardados en favoritos.
        </p>
      )}
    </div>
  );
};

export default Favoritos;
