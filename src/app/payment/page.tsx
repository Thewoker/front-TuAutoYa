"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Producto de prueba",
        price: 1000, // Precio en moneda local
        name: "Cliente de prueba",
        email: "cliente@correo.com",
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.init_point) {
      window.location.href = data.init_point; // Redirige al checkout de Mercado Pago
    } else {
      alert("Hubo un problema al crear la preferencia de pago.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-emerald-900 text-3xl font-bold mb-4">Pagar con Mercado Pago</h1>
        <p className="text-gray-700 mb-6">Haz clic en el botón para continuar con el pago.</p>
        <button
          onClick={handlePayment}
          disabled={loading}
          className={` bg-amber-500 px-4 py-2 text-white rounded ${
            loading ? "bg-amber-500" : "bg-amber-500 hover:bg-sky-500"
          }`}
        >
          {loading ? "Procesando..." : "Pagar Ahora"}
        </button>
      </div>
    </div>
  );
}
