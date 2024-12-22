import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Definir la interfaz para los datos de las agencias
interface Agency {
  nombre: string;
  direccion: string;
  telefono: string;
  logo: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface MapaDeAgenciasProps {
  agencies: Agency[]; // Usar la interfaz para tipar 'agencies'
}

const MapaDeAgencias: React.FC<MapaDeAgenciasProps> = ({ agencies }) => {
  // Establecer el estado con el tipo adecuado
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = { lat: 4.60971, lng: -74.08175 }; // Coordenadas de Bogotá, por ejemplo

  useEffect(() => {
    if (map) {
      // Si la instancia del mapa existe, puedes usarla aquí
      console.log(map); // Puedes realizar acciones con el mapa aquí
    }
  }, [map]);

  return (
    <div className="w-full h-[500px] mt-6 ">
      <LoadScript googleMapsApiKey="AIzaSyAjJQcg0hWUmGQl5zuszGbsxMXfr027j5E">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={12}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {agencies.map((agency, index) => (
            <Marker
              key={index}
              position={agency.location}
              title={agency.nombre}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapaDeAgencias;
