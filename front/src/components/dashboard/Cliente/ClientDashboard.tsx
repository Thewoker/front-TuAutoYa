import React, { useState, useEffect } from "react";
import { Rental } from "@/Interfaces/IClientDashboard";
import RentalCard from "@/components/dashboard/Cliente/ClientCarCard";
import Link from "next/link";

const ClientReservations: React.FC = () => {
  // Simula obtener el usuario desde un servicio o contexto
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Simula una llamada a la API para obtener el usuario logueado
    setUser({
      name: "Laura",
      email: "tuemail@gmail.com",
    });
  }, []);

  // Obtener la primera letra del nombre del usuario
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  const rentals: Rental[] = [
    {
      id: "1",
      carId: "CAR001",
      model: "Model 3",
      brand: "Tesla",
      price: 150,
      image: "/model3.jpg",
      status: "upcoming",
      dateStart: new Date("2023-07-01"),
      dateEnd: new Date("2023-07-05"),
      total: 600,
      mileage: 5000,
      fuelType: "Eléctrico",
      transmission: "Automático",
      location: "Barcelona, España",
    },
    {
      id: "2",
      carId: "CAR002",
      model: "Civic",
      brand: "Honda",
      price: 80,
      image: "/civic.jpg",
      status: "past",
      dateStart: new Date("2023-05-15"),
      dateEnd: new Date("2023-05-20"),
      total: 400,
      mileage: 30000,
      fuelType: "Gasolina",
      transmission: "Manual",
      location: "Madrid, España",
    },
  ];
  const upcomingRentals = rentals.filter(
    (rental) => rental.status === "upcoming"
  );
  const pastRentals = rentals.filter((rental) => rental.status === "past");

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-1/4 h-screen bg-white border-r">
        <div className="mx-auto py-10">
          <h1 className="text-2xl font-bold mb-10 text-emerald-950 cursor-pointer">
            Mi perfil
          </h1>
          <ul>
            <li className="flex space-x-2 mt-10 
            text-emerald-950 cursor-pointer hover:text-sky-500">
                <Link href="/">
                <span className="font-semibold">Home</span>
          </Link>
              
            </li>
            <li className="flex space-x-2 mt-10 text-emerald-950 cursor-pointer hover:text-sky-500">
              <span className="font-semibold">Mis Reservas</span>
              <Link href="/Reserva">
                <span className="font-semibold">Home</span>
          </Link>
            </li>
            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-sky-500">
              <span className="font-semibold">Mis Pagos</span>
            </li>
            <li className="flex space-x-2 mt-10 text-emerald-950cursor-pointer hover:text-sky-500">
            <Link href="/perfil">
                <span className="font-semibold">Perfil</span>
          </Link>
          
            </li>
          </ul>
          <button className="mt-10 w-full bg-amber-400 text-emerald-950 rounded-full py-2 hover:text-sky-500">
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen w-full bg-white">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-10 py-6 border-b bg-white">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-96">
            <input
              type="text"
              placeholder="Buscar"
              className="bg-gray-100 outline-none w-full"
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Avatar con inicial */}
            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
              {avatarLetter}
            </div>
          </div>
        </nav>

        {/* Reservations */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-900">
            Próximas Reservas
          </h2>
          <div className="space-y-6 mb-8">
            {rentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientReservations;
