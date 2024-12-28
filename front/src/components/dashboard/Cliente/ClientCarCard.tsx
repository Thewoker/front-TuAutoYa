import { format, differenceInDays } from 'date-fns';
import { Car, Calendar, Clock, DollarSign, MapPin, Fuel, Gauge, Zap } from 'lucide-react';
import { Rental } from "@/Interfaces/IClientDashboard"


const RentalCard: React.FC<{ rental: Rental }> = ({ rental }) => {
    const rentalDuration = differenceInDays(rental.dateEnd, rental.dateStart);

    return (
        <div className="bg-[#f59e0b] shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3">
                <img src={`/Images/${rental.image}`} alt={`${rental.brand} ${rental.model}`} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-2xl">{rental.brand} {rental.model}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${rental.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
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

export default RentalCard;