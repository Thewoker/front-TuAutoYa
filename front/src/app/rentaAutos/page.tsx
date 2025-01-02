import React from 'react';
import cars from '@/helpers/cars'; // Ajusta la ruta según corresponda

const RentaAutos: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-12 text-center text-emerald-900">
        Autos Disponibles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="w-full h-72 overflow-hidden">
                <img
                  src={car.img}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-emerald-900 mb-4">
                  {car.brand} {car.model}
                </h2>
                <p className="text-gray-600">{car.description}</p>
                <p className="text-amber-500 font-bold mt-2">
                  ${car.pricePerDay} / día
                </p>
                <button className="mt-4 bg-amber-400 text-white px-4 py-2 rounded hover:bg-sky-500 transition">
                  Reservar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay autos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default RentaAutos;
