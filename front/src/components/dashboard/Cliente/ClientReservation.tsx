import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { Car, Calendar, Clock, DollarSign, MapPin, Fuel, Gauge, Zap } from 'lucide-react';

interface Rental {
  id: string;
  carId: string;
  model: string;
  brand: string;
  price: number;
  image: string;
  status: 'upcoming' | 'past';
  dateStart: Date;
  dateEnd: Date;
  total: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
}

const RentalCard: React.FC<{ rental: Rental }> = ({ rental }) => {
  const rentalDuration = differenceInDays(rental.dateEnd, rental.dateStart);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img src={`/Images/${rental.image}`} alt={`${rental.brand} ${rental.model}`} className="w-full h-full object-cover" />
      </div>
      <div className="md:w-2/3 p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-2xl">{rental.brand} {rental.model}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            rental.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {rental.status === 'upcoming' ? 'Próximo' : 'Pasado'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Car className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">ID: {rental.carId}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">{format(rental.dateStart, 'dd/MM/yyyy')} - {format(rental.dateEnd, 'dd/MM/yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">{rentalDuration} {rentalDuration === 1 ? 'día' : 'días'}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">${rental.price}/día</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">{rental.location}</span>
          </div>
          <div className="flex items-center">
            <Fuel className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">{rental.fuelType}</span>
          </div>
          <div className="flex items-center">
            <Gauge className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">{rental.mileage} km</span>
          </div>
          <div className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-gray-700">{rental.transmission}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Total:</span>
            <span className="text-2xl font-bold text-green-600">${rental.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientReservations: React.FC = () => {
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
      <h1 className="text-3xl font-bold mb-8">Mis Reservas</h1>
      
      <h2 className="text-2xl font-semibold mb-4">Próximas Reservas</h2>
      <div className="space-y-6 mb-8">
        {upcomingRentals.map(rental => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Reservas Pasadas</h2>
      <div className="space-y-6">
        {pastRentals.map(rental => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>
    </div>
  );
};

export default ClientReservations;

