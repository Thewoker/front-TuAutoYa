"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Importamos el mapa dinámicamente para evitar la renderización en el servidor
const MapWithNoSSR = dynamic(() => import("@/components/MapaDeAgencias/MapaDeAgencias"), {
  ssr: false, // Evitar renderizado en el servidor
});

const agencies = [
  {
    id: 1,
    nombre: "Alamo",
    direccion: "Av. El Dorado #103-09, Bogotá",
    telefono: "317 3892518",
    logo: "/images/alamo_logo_lrg.gif",
    lat: 4.60971,
    lng: -74.08175,
  },
  {
    id: 2,
    nombre: "Avis",
    direccion: "Av. El Dorado #103-09, Bogotá",
    telefono: "316 6913528",
    logo: "/images/avis_logo_lrg.gif",
    lat: 4.60972,
    lng: -74.08176,
  },
  {
    id: 3,
    nombre: "Foco Rent a Car",
    direccion: "Cra. 67 #100 20, Suba, Bogotá, Cundinamarca",
    telefono: "31023555589",
    logo: "/images/foco_rent_a_car_logo_lrg.gif",
    lat: 4.70744,
    lng: -74.04568,
  },
];

// Definimos los marcadores basados en las agencias
const markers = agencies.map((agency) => ({
  id: agency.id,
  position: { lat: agency.lat, lng: agency.lng },
  nombre: agency.nombre,
  direccion: agency.direccion,
  telefono: agency.telefono,
  logo: agency.logo,
}));

const DirectorioDeAgencias: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Aseguramos que estamos en el cliente
  }, []);

  if (!isClient) {
    return null; // Evitar renderizado en el servidor
  }

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

      {/* Aquí cargamos el mapa de las agencias */}
      <div className="mt-8 w-full h-32 md:h-48">
        <h2 className="text-3xl font-bold text-center mb-6">Mapa de Agencias</h2>
        {/* Ajustamos el tamaño del mapa con Tailwind CSS */}
        <div className="w-full h-32 md:h-48">
          {/* Pasamos el array de marcadores al componente del mapa */}
          <MapWithNoSSR markers={markers} />
        </div>
      </div>
    </div>
  );
};

export default DirectorioDeAgencias;
