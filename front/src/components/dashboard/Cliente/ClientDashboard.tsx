import React from 'react';
import { Rental } from "@/Interfaces/IClientDashboard";
import RentalCard from "@/components/dashboard/Cliente/ClientCarCard";

const ClientReservations: React.FC = () => {
  // Datos de reservas (simulados para este ejemplo)
  const rentals: Rental[] = [
    {
      id: '1',
      carId: 'CAR001',
      model: 'Model 3',
      brand: 'Tesla',
      price: 150,
      image: '/model3.jpg',
      status: 'upcoming',
      dateStart: new Date('2023-07-01'),
      dateEnd: new Date('2023-07-05'),
      total: 600,
      mileage: 5000,
      fuelType: 'Eléctrico',
      transmission: 'Automático',
      location: 'Barcelona, España',
    },
    {
      id: '2',
      carId: 'CAR002',
      model: 'Civic',
      brand: 'Honda',
      price: 80,
      image: '/civic.jpg',
      status: 'past',
      dateStart: new Date('2023-05-15'),
      dateEnd: new Date('2023-05-20'),
      total: 400,
      mileage: 30000,
      fuelType: 'Gasolina',
      transmission: 'Manual',
      location: 'Madrid, España',
    },
  ];

  const upcomingRentals = rentals.filter(rental => rental.status === 'upcoming');
  const pastRentals = rentals.filter(rental => rental.status === 'past');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra de navegación superior */}
      <div className="flex container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-sky-500"></h2>

        {/* Contenedor con fondo blanco, bordes redondeados y sombra */}
        <div className="bg-white rounded-xl p-4 shadow-lg flex space-x-4">
          <button className="bg-amber-400 text-white px-4 py-2 rounded hover:bg-sky-500 transition">
            Lista de Favoritos
          </button>
          <button className="bg-amber-400 text-white px-4 py-2 rounded hover:bg-sky-500 transition">
            Reservas
          </button>
          <button className="bg-emerald-900 text-white px-4 py-2 rounded hover:bg-sky-500 transition">
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6">
      

        {/* Sección de Próximas Reservas */}
        <h2 className="text-2xl font-semibold mb-4 text-emerald-900">Próximas Reservas</h2>
        <div className="space-y-6 mb-8">
          {upcomingRentals.map(rental => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
        </div>

        {/* Sección de Reservas Pasadas */}
        <h2 className="text-2xl font-semibold mb-4 text-emerald-900">Reservas Pasadas</h2>
        <div className="space-y-6">
          {pastRentals.map(rental => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReservations;
