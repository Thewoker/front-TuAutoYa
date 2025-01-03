// app/mapa/page.tsx
// /app/maps/page.tsx
import React from "react";
import MapaDeAgencias from "@/components/MapaDeAgencias/MapaDeAgencias"; // Importa el componente MapaDeAgencias
import { agencies } from "@/Interfaces/agencies"; // Asegúrate de importar las agencias desde su archivo

const MapsPage = () => {
  return (
    <div>
      <h1>Mapa de Agencias</h1>
      <MapaDeAgencias markers={[]} /> {/* Pasa las agencias como prop */}
    </div>
  );
};

export default MapsPage;
