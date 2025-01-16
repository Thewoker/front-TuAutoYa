import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Estilos de Leaflet
import "leaflet/dist/leaflet.css";

// Interface para los marcadores
interface MarkerProps {
  id: string;
  lat: number;
  lng: number;
  name: string;
  address?: string;
}

interface MapaDeAgenciasProps {
  markers: MarkerProps[];
}

const MapaDeAgencias: React.FC<MapaDeAgenciasProps> = ({ markers }) => {
  // Eliminar íconos por defecto de Leaflet y crear un icono personalizado
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/",
    shadowSize: [41, 41],
  });

  // Estado para almacenar el centro del mapa
  const [center, setCenter] = useState<[number, number]>([-31.416666666667, -64.183333333333]); // Centro predeterminado

  useEffect(() => {
    // Verificamos si hay marcadores válidos
    const validMarkers = markers.filter(
      (marker) => marker.lat && marker.lng
    );

    if (validMarkers.length > 0) {
      // Calcular el centro promedio de los marcadores válidos
      const latitudes = validMarkers.map((marker) => marker.lat);
      const longitudes = validMarkers.map((marker) => marker.lng);

      const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
      const avgLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

      setCenter([avgLat, avgLng]); // Actualizamos el centro con el promedio
    }
  }, [markers]); // Solo ejecuta esto cuando cambian los markers

  return (
    <MapContainer
      center={center} // Usamos el centro calculado dinámicamente
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers
        .filter((marker) => marker.lat && marker.lng) // Filtrar marcadores válidos
        .map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]} // Coordenadas del marcador
            icon={customIcon}
          >
            <Popup>
              <strong>{marker.name}</strong>
              {marker.address && (
                <>
                  <br />
                  {marker.address}
                </>
              )}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapaDeAgencias;
