
"use client";

import Link from "next/link";

const GraciasPorTuReserva = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/df/0a/d7/df0ad71d0da0d9dc89b4fbab658c96da.gif')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600">¡Gracias por tu reserva!</h1>
        <p className="text-lg mt-4">
          Tu reserva ha sido confirmada correctamente.
        </p>
        <p className="mt-2 text-md text-gray-600">
          Serás redirigido a tus reservas en breve...
        </p>
        <Link href="/Reserva">
          <button
            type="button"
            className="mt-6 py-3 px-6 text-white font-semibold bg-amber-500 rounded-md hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Ir a mis Reservas
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GraciasPorTuReserva;


