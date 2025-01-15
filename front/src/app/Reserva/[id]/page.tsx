"use client"
import { useGetCars } from "@/api/getCars";
import ReservaSkeleton from "@/components/Reserva/FormReservaSkeleton";
import { ResponseType } from "@/types/response";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Reserva() {
  const [role, setRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const {loading, cars} : ResponseType = useGetCars();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
            if (data?.message != "Not logged in") {
              const user = JSON.parse(data)

              if (user) {
                  setRole(user.role)
                  setUserId(user.id)
                  setUserName(user.name)
              } else{
                console.log('No se encuentra el rol')
              }
            } 
        } catch (error) {
            console.error("Se ha producido un error: ", error)
        }
    }

    getRole()
  });

  const calculateTotalPrice = (
    startDate: string, 
    endDate: string, 
    pricePerDay: number,
    discount: number
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const days = timeDifference / (1000 * 3600 * 24);

    let totalPrice = days * pricePerDay;

    // Aplica el descuento, si existe
    if (discount > 0) {
      totalPrice -= totalPrice * (discount / 100);
    }

    return totalPrice.toFixed(2); // Retorna el precio con 2 decimales
  };


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
        cars: [{id: car?.id}],
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


  if (loading) return <ReservaSkeleton />;

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-emerald-900 mb-8">
          Reserva tu vehículo
        </h2>
        {error && <p>{error}</p>}

        {car && (
          <div className="flex items-center mb-6">
            {/* <img
              src={car.image} // Imagen del coche
              alt="Auto seleccionado"
              className="w-1/3 h-auto rounded-lg shadow-lg"
            /> */}
            <Image
                src={car.image}
                alt="Auto seleccionado"
                width={300}
                height={200}
                className="rounded-lg shadow-lg"
            />
            <div className="ml-6">
              <h3 className="text-2xl font-semibold text-emerald-900">
                {car.year} {car.brand} {car.model}
              </h3>
              <p className="text-gray-600 mt-2">
                <b>Reseñas:</b> {car.rating}
              </p>
              <p className="text-gray-600">
                <b>Caracteristicas:</b> {car.transmission} | {car.brakes} | {car.kilometer}
              </p>
              <p className="text-gray-600">
              <b>Precio por Día: </b> 
              {car.discount > 0 ? (
                <>
                  <span className="line-through text-red-500">${car.pricePerDay} </span> 
                  <span className="text-emerald-600 font-semibold ml-1">
                    ${Math.round(parseFloat(car.pricePerDay) * (1 - car.discount / 100))}
                  </span>
                </>
              ) : (
                <span className="text-emerald-600 font-semibold">${car.pricePerDay}</span>
              )}
              </p>
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
                min={new Date().toISOString().split("T")[0]}
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
                min={startDate}
                className="w-full border border-amber-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <label className="block text-md font-medium text-emerald-900 w-1/3">Precio Total:</label>
            <div className="ml-4 w-2/3">
              <p>{startDate && endDate && parseFloat(car?.pricePerDay || '0') > 0 ? (
                  <span className="font-semibold text-amber-600">
                    ${calculateTotalPrice(
                      startDate, 
                      endDate, 
                      parseFloat(car?.pricePerDay || '0'),
                      car?.discount || 0
                      )}
                  </span>
                ) : (
                  <span className="font-semibold text-amber-600">0</span>
                )}</p>
            </div>
          </div>
          {role && (
            <div className="space-y-4 pb-4">
              <label className="block text-md font-medium text-emerald-900">Hola {userName}, ya estas logeado usaremos tus datos para realizar la reserva </label>
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
