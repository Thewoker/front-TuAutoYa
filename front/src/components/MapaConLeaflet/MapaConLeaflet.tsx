// /src/components/MapaConLeaflet/MapaConLeaflet.tsx
'use client'; // Indica que este componente se ejecuta en el cliente

import dynamic from 'next/dynamic';

const MapaConLeaflet = dynamic(() => import('@/components/MapaDeAgencias/MapaDeAgencias'), {
  ssr: false, // Desactiva el Server-Side Rendering para este componente
});

export default MapaConLeaflet;
