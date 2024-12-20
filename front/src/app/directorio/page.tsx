"use client";

import React from "react";
import Image from "next/image";

const agencies = [
  {
    nombre: "Alamo",
    direccion: "Av. El Dorado #103-09, Bogotá",
    Telefono : " 317 3892518",
    logo: "/images/alamo_logo_lrg.gif",
  },
  {
    nombre: "Avis",
    direccion: "Av. El Dorado #103-09, Bogotá",
    telefono : "316 6913528",
    logo: "/images/avis_logo_lrg.gif",
  },
  {
    nombre: "Foco Rent a Car",
    direccion: "Cra. 67 #100 20, Suba, Bogotá, Cundinamarca",
    telefono: "31023555589",
    logo: "/images/foco_rent_a_car_logo_lrg.gif",
  },
];

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
        {agencies.map((agency, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-center">
              <Image
                src={agency.logo}
                alt={`${agency.nombre} logo`}
                width={150}
                height={100}
                className="object-contain mb-4"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {agency.nombre}
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              Dirección: {agency.direccion}
            </p>
            <p className="text-gray-600 text-center">Teléfono: {agency.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectorioDeAgencias;
