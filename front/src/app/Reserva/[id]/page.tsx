"use client"
import Car from "@/Interfaces/ICar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Reserva() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const { id } = useParams();
  const car = cars.find((car) => car.id === id);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Reserva exitosa!");
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-emerald-900 mb-8">
          Reserva tu vehículo
        </h2>

        {car && (
          <div className="flex items-center mb-6">
            <img
              src={car.image} // Imagen del coche
              alt="Auto seleccionado"
              className="w-1/3 h-auto rounded-lg shadow-lg"
            />
            <div className="ml-6">
              <h3 className="text-2xl font-semibold text-emerald-900">
                {car.year} {car.brand} {car.model}
              </h3>
              <p className="text-gray-600">
                {car.transmission} | {car.brakes} | {car.kilometer} | ${car.pricePerDay}
              </p>
              <p className="text-gray-600 mt-2">Reseñas: {car.rating}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <label className="block text-md font-medium text-emerald-900 w-1/3">Salida:</label>
            <div className="ml-4 w-2/3">
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleDateChange}
                className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="block text-md font-medium text-emerald-900 w-1/3">Retorno:</label>
            <div className="ml-4 w-2/3">
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleDateChange}
                className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-emerald-900">Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  value={userDetails.firstName}
                  onChange={handleUserChange}
                  className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-emerald-900">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  value={userDetails.lastName}
                  onChange={handleUserChange}
                  className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tu apellido"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900">Número de Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleUserChange}
                className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tu número de teléfono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleUserChange}
                className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tu correo electrónico"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="saveDetails" className="h-5 w-5" />
            <label htmlFor="saveDetails" className="text-sm text-emerald-900">
              Guardar mis detalles para futuras reservas
            </label>
          </div>

          <Link href="/GraciasPorTuReserva">
      <button
        type="button"
        className="w-full py-3 px-6 text-white font-semibold bg-amber-500 rounded-md hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Reservar ahora
      </button>
    </Link>
        </form>
      </div>
    </div>
  );
}

export default Reserva;
