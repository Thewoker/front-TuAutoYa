"use client";

import React from "react";

const Contacto: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-amber-500 mb-6">
        Contáctanos
      </h1>
      <p className="text-gray-700 text-center mb-6">
        ¿Tienes preguntas? ¡Estamos aquí para ayudarte!
      </p>
      <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="w-full border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Escribe tu nombre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="w-full border-gray-300 rounded-lg p-2 mt-1"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium">
            Mensaje
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Escribe tu mensaje aquí"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-amber-500 text-white rounded-lg p-2 hover:bg-amber-600 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;