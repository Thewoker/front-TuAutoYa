"use client";

import React from "react";

const DirectorioDeAgencias: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-amber-500 mb-6">
        Directorio de Agencias
      </h1>
      <p className="text-gray-700 text-center mb-6">
        Encuentra las mejores agencias cerca de ti para alquilar un vehículo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta de agencia 1 */}
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800">
            Agencia 1
          </h2>
          <p className="text-gray-600 mt-2">
            Dirección: Calle 123, Ciudad.
          </p>
          <p className="text-gray-600">Teléfono: (123) 456-7890</p>
        </div>

        {/* Tarjeta de agencia 2 */}
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800">
            Agencia 2
          </h2>
          <p className="text-gray-600 mt-2">
            Dirección: Avenida 456, Ciudad.
          </p>
          <p className="text-gray-600">Teléfono: (987) 654-3210</p>
        </div>

        {/* Tarjeta de agencia 3 */}
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800">
            Agencia 3
          </h2>
          <p className="text-gray-600 mt-2">
            Dirección: Plaza Central, Ciudad.
          </p>
          <p className="text-gray-600">Teléfono: (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default DirectorioDeAgencias;
