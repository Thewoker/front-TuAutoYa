
"use client"
import { useState } from "react";

function Reserva() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // Manejo del cambio en las fechas de reserva
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  // Manejo del cambio en los detalles del usuario
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar la reserva
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los detalles al backend o realizar la acción de reserva
    alert("¡Reserva exitosa!");
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-emerald-900 mb-8">
          Reserva tu vehículo
        </h2>

        <div className="flex items-center mb-6">
          <img
            src="https://uiparadox.co.uk/public/templates/carvoyage/assets/media/blog/booking.jpg" // Imagen del coche (sustituir por la imagen real del coche seleccionado)
            alt="Auto seleccionado"
            className="w-1/3 h-auto rounded-lg shadow-lg"
          />
          <div className="ml-6">
            <h3 className="text-2xl font-semibold text-emerald-900">2024 Tesla Model 3</h3>
            <p className="text-gray-600">Automático | ABS | 45,000 Kms | $25/hr</p>
            <p className="text-gray-600 mt-2">Reseñas: 4.7</p>
          </div>
        </div>

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

          {/* Detalles del usuario */}
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

          {/* Checkbox para guardar los detalles */}
          <div className="flex items-center space-x-2">
            <input type="checkbox border border-amber-400" id="saveDetails" className="h-5 w-5" />
            <label htmlFor="saveDetails" className="text-sm emerald-900">
              Guardar mis detalles para futuras reservas
            </label>
          </div>

          {/* Botón de reserva */}
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
