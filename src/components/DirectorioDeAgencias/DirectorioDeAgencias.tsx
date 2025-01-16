"use client";

import React, { useEffect, useState } from "react";
import IUsersOwner from "@/Interfaces/IUsersOwner";

// Importamos el mapa dinámicamente para evitar la renderización en el servidor

const DirectorioDeAgencias: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState<IUsersOwner[]>([]);

  useEffect(() => {
    setIsClient(true); // Aseguramos que estamos en el cliente
  }, []);

  const fetchUsers = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        // Filtrar solo los usuarios con rol "owner"
        const owners = data.filter((user: { role: string }) => user.role === "owner");
        setUsers(owners)
    } catch (err) {
        console.error(err)
    } finally {
    }
  }

  useEffect(() => {
      fetchUsers()
  }, [])

  if (!isClient) {
    return null; // Evitar renderizado en el servidor
  }

  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-amber-500 mb-6">
        Directorio de Agencias
      </h1>
      <p className="text-gray-700 text-center mb-6">
        Encuentra las mejores agencias cerca de ti para alquilar un vehículo.
      </p>
      {/* Tab de proveedores  */}
      <div className="max-w-screen-lg mx-auto p-6">
        <div className="flex bg-gray-50 shadow-lg rounded-lg">
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
                <p className="text-gray-600">{tab.address}</p>
                {/* Contenedor para el mapa */}
                <div className="w-full h-64 rounded-lg shadow-md border border-gray-300 mb-6">
                  {/* <MapWithNoSSR
                    markers={[{
                      id: tab.id,
                      position: { lat: tab.lat, lng: tab.lng },
                      nombre: tab.name,
                      direccion: tab.address,
                    }]}
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorioDeAgencias;
