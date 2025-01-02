import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface MarkerProps {
  id: number;
  position: { lat: number; lng: number };
  nombre: string;
  direccion: string;
  telefono: string;
  logo: string;
}

interface MapProps {
  markers: MarkerProps[];
}

const MapaDeAgencias: React.FC<MapProps> = ({ markers }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAjJQcg0hWUmGQl5zuszGbsxMXfr027j5E", // Reemplaza con tu clave de Google Maps API
  });

  if (loadError) {
    return <div>Error al cargar el mapa.</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={{ lat: 4.60971, lng: -74.08175 }} // Centro de Bogotá
      zoom={12}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.nombre}
          icon={{
            url: marker.logo,
            scaledSize:
              window.google && window.google.maps
                ? new window.google.maps.Size(40, 40)
                : undefined, // Verifica que window.google.maps esté disponible
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapaDeAgencias;
