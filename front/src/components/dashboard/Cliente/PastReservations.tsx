import React from "react";
import { Order } from "@/Interfaces/IClientDashboard";
import RentalCard from "@/components/dashboard/Cliente/ClientCarCard";

interface PastReservationsProps {
  rentals: Order[];
}

const PastReservations: React.FC<PastReservationsProps> = ({ rentals }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-900">
        Reservas Pasadas
      </h2>
      <div className="space-y-6 mb-8">
        {rentals.map((rental) => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>
    </div>
  );
};

export default PastReservations;

