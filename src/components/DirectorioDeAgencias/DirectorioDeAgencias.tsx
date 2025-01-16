"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import IUsersOwner from "@/Interfaces/IUsersOwner";
import "leaflet/dist/leaflet.css";

// Importamos el mapa dinámicamente para evitar renderización en el servidor
const MapWithNoSSR = dynamic(() => import("@/components/MapaDeAgencias/MapaDeAgencias"), {
  ssr: false,
});

const DirectorioDeAgencias: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState<IUsersOwner[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true); // Aseguramos que estamos en el cliente
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      const owners = data.filter((user: { role: string }) => user.role === "owner");

      // Obtener coordenadas para cada dirección
      const geocodedOwners = await Promise.all(
        owners.map(async (owner: IUsersOwner) => {
          try {
            const geocodeResponse = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                owner.address
              )}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
            );
            const geocodeData = await geocodeResponse.json();

            if (geocodeData.results.length > 0) {
              const location = geocodeData.results[0].geometry;
              return {
                ...owner,
                lat: location.lat,
                lng: location.lng,
                logo: "/images/alamo_logo_lrg.gif",
              };
            } else {
              console.error(`Geocoding failed for address: ${owner.address}`);
              return { ...owner, lat: null, lng: null };
            }
          } catch (error) {
            console.error("Error during geocoding:", error);
            return { ...owner, lat: null, lng: null };
          }
        })
      );

      setUsers(geocodedOwners);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!isClient) {
    return null; // Evitar renderizado en el servidor
  }

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-amber-500 mb-6">
        Directorio de Agencias
      </h1>
      <p className="text-gray-700 text-center mb-6">
        Encuentra las mejores agencias cerca de ti para alquilar un vehículo.
      </p>
      <div className="max-w-screen-lg mx-auto p-6">
        <div className="flex bg-gray-50 shadow-lg rounded-lg">
          {/* Lista de pestañas (izquierda) */}
          <ul className="flex flex-col bg-gradient-to-b from-emerald-500 to-emerald-700 text-white w-1/3 rounded-l-lg p-4 space-y-2">
            {users.map((tab, index) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                    activeTab === index
                      ? "bg-white text-emerald-700 shadow-md"
                      : "hover:bg-emerald-600 hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{tab.name}</span>
                    <span className="text-sm text-emerald-300">{tab.address}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* Contenido de las pestañas (derecha) */}
          <div className="w-2/3 p-6">
            {users.map((tab, index) => (
              <div
                key={tab.id}
                className={`transition-opacity duration-300 ${
                  activeTab === index ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                <h3 className="text-2xl font-bold text-emerald-700 mb-4">
                  {tab.name}
                </h3>
                <p className="text-gray-600">
                  {tab.address} {tab.lat} {tab.lng}
                </p>
                {/* Verificar que latitud y longitud no son nulas antes de mostrar el mapa */}
                {tab.lat && tab.lng ? (
                  <div className="w-full h-80 rounded-lg shadow-md border border-gray-300 mb-6">
                    {/* Map container with defined height */}
                    <MapWithNoSSR
                      markers={[{ id: tab.id, lat: tab.lat, lng: tab.lng, name: tab.name }]}
                    />
                  </div>
                ) : (
                  <p>Coordenadas no disponibles</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorioDeAgencias;
