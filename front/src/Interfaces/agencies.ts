export interface Location {
    lat: number;
    lng: number;
  }
  
  export interface Agency {
    nombre: string;
    direccion: string;
    telefono: string;
    logo: string;
    location: { // Asegúrate de que lat y lng estén dentro de location
        lat: number;
        lng: number;
    };
}

  

// app/agencies/agencies.ts
export const agencies = [
    {
      nombre: "Alamo",
      direccion: "Av. El Dorado #103-09, Bogotá",
      telefono: "317 3892518",
      logo: "/images/alamo_logo_lrg.gif",
      location: { lat: 4.6775, lng: -74.1178 }, // Coordenadas de la agencia
    },
    {
      nombre: "Avis",
      direccion: "Av. El Dorado #103-09, Bogotá",
      telefono: "316 6913528",
      logo: "/images/avis_logo_lrg.gif",
      location: { lat: 4.6798, lng: -74.1146 }, // Coordenadas de la agencia
    },
    {
      nombre: "Foco Rent a Car",
      direccion: "Cra. 67 #100 20, Suba, Bogotá, Cundinamarca",
      telefono: "31023555589",
      logo: "/images/foco_rent_a_car_logo_lrg.gif",
      location: { lat: 4.7109, lng: -74.0719 }, // Coordenadas de la agencia
    },
  ];
  
  
  
export interface MapaDeAgenciasProps {
    agencies: {
      nombre: string;
      location: {
        lat: number;
        lng: number;
      };
    }[];
  }