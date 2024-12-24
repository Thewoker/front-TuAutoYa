import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

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
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={{ lat: 4.60971, lng: -74.08175 }} // Centro de Bogotá (puedes ajustarlo si lo prefieres)
      zoom={12}
    >
      {/* Colocamos un marcador por cada agencia */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.nombre}
          icon={{
            url: marker.logo, // Usamos el logo como icono del marcador
            scaledSize: new window.google.maps.Size(40, 40), // Ajustamos el tamaño del icono
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapaDeAgencias;
