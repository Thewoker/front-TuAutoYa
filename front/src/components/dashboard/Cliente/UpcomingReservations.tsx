import React from "react";
import { Order } from "@/Interfaces/IClientDashboard";
import RentalCard from "@/components/dashboard/Cliente/ClientCarCard";

interface UpcomingReservationsProps {
  rentals: Order[];
}

const UpcomingReservations: React.FC<UpcomingReservationsProps> = ({ rentals }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-900">
        Próximas Reservas
      </h2>
      {rentals?.length === 0 ? (
        <p className="text-gray-600">No tienes reservas pendientes.</p>
      ) : (
        <div className="space-y-6 mb-8">
          {rentals?.map((rental) => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingReservations;

