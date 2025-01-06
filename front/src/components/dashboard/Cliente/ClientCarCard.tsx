import React from "react";
import { format, differenceInDays } from 'date-fns';
import { Car, Calendar, Clock, DollarSign, MapPin, Fuel, Gauge, Zap } from 'lucide-react';
import { Rental } from "@/Interfaces/IClientDashboard";

const RentalCard: React.FC<{ rental: Rental }> = ({ rental }) => {
    const car = rental.users.cars?.[0];
    if (!car) return null;

    const rentalDuration = differenceInDays(new Date(rental.orderDate), new Date());

    return (
        <div className="shadow-lg rounded-lg overflow-hidden flex flex-col max-w-md mx-auto">
            {/* Imagen del vehículo */}
            <div className="w-full h-48 md:h-64">
                <img
                    src={`/Images/${car.image}`}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Información de la reserva debajo de la imagen */}
            <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-4 text-emerald-900">
                    <h3 className="font-bold text-xl md:text-2xl">{car.brand} {car.model}</h3>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            rental.status === 'active'
                                ? 'bg-emerald-900 text-white'
                                : 'bg-sky-500 text-white'
                        }`}
                    >
                        {rental.status === 'active' ? 'Activo' : 'Pasado'}
                    </span>
                </div>

                {/* Información del vehículo y fechas */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                        <Car className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">ID: {car.id}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">
                            {format(new Date(rental.orderDate), 'dd/MM/yyyy')}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">
                            {rentalDuration} {rentalDuration === 1 ? 'día' : 'días'}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">${car.pricePerDay}/día</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">{rental.users.city}</span>
                    </div>
                    <div className="flex items-center">
                        <Fuel className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">{car.fuelType}</span>
                    </div>
                    <div className="flex items-center">
                        <Gauge className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">{car.kilometer} km</span>
                    </div>
                    <div className="flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-700">{car.transmission}</span>
                    </div>
                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-sky-500">${car.pricePerDay * rentalDuration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalCard;

