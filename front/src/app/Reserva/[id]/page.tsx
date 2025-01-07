"use client"
import { useGetCars } from "@/api/getCars";
import { ResponseType } from "@/types/response";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Reserva() {
  const [role, setRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const {loading, cars} : ResponseType = useGetCars();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentaDays, setRentalsDay] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    identity: "",
    phone: "",
    city: ""
  });
  const [error, setError] = useState('');

  const { id } = useParams();
  const car = cars.find((car) => car.id === id);

  useEffect(() => {
    const getRole = async () => {
        try {
            const { data } = await axios.get("/api/getUserData")
            const user = JSON.parse(data)
            console.log(user)
            if (user) {
                setRole(user.role)
                setUserId(user.id)
                setUserName(user.name)
                setRentalsDay("")
            } else{
              console.log('No se encuentra el rol')
            }
        } catch (error) {
            console.error("Se ha producido un error: ", error)
        }
    }

    getRole()
  });


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(userId)
    console.log(car)
    console.log(startDate)
    console.log(endDate)
    console.log(startDate)

    if (!userId || !car || !startDate || !endDate) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const orderResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        userId,
        cars: [{id: car?.id, rentalDays: rentaDays}],
        endDate,
        startDate,
      });
      const { paymentLink } = orderResponse.data;
      if (paymentLink) {
        // Redirigir al link de pago generado por MercadoPago
        window.location.href = paymentLink;
      } else {
        setError('Error al generar el enlace de pago.');
      }
    } catch (error) {
      setError('Hubo un error al procesar tu reserva. Intenta nuevamente.');
      console.error(error);
    }
  };


  if (loading) return <div>Cargando...</div>;

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-emerald-900 mb-8">
          Reserva tu vehículo
        </h2>
        {error && <p>{error}</p>}

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
          <div className="flex items-center">
            <label className="block text-md font-medium text-emerald-900 w-1/3">Número de días:</label>
            <div className="ml-4 w-2/3">
              <input
                type="number"
                name="rentaDays"
                value={rentaDays}
                onChange={handleDateChange}
                className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          {role ? (
            <div className="space-y-4 pb-4">
              <label className="block text-md font-medium text-emerald-900">Hola {userName}, ya estas logeado usaremos tus datos para realizar la reserva </label>
            </div>
          ): (
            <div className="space-y-4 pb-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-emerald-900">Carnet de Identidad</label>
                  <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleUserChange}
                    className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-emerald-900">Carnet de Identidad</label>
                  <input
                    type="text"
                    name="identity"
                    value={userDetails.identity}
                    onChange={handleUserChange}
                    className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tu carnet de identidad"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
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
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-emerald-900">Ciudad</label>
                  <input
                    type="text"
                    name="city"
                    value={userDetails.city}
                    onChange={handleUserChange}
                    className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ingresa tu ciudad"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
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
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-emerald-900">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleUserChange}
                    className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Contraseña con una mayuscula,un signo y un numero"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="saveDetails" className="h-5 w-5" />
                <label htmlFor="saveDetails" className="text-sm text-emerald-900">
                  Guardar mis detalles para futuras reservas
                </label>
              </div>
            </div>
            
          )}
          
          
            <button
              type="submit"
              className="w-full py-3 px-6 text-white font-semibold bg-amber-500 rounded-md hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Reservar ahora
            </button>
        </form>
      </div>
    </div>
  );
}

export default Reserva;
