// components/MapWithNoSSR.tsx
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/MapaDeAgencias/MapaDeAgencias"), {
  ssr: false, // Desactiva la renderización en el servidor
});

export default MapWithNoSSR;
