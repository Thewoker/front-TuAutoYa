"use client";

import React, { useState } from "react";

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir el enlace mailto con los campos del formulario
    const subject = encodeURIComponent(`Mensaje de ${formData.name}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nCorreo: ${formData.email}\n\nMensaje:\n${formData.message}`
    );

    // Crear el enlace mailto
    const mailtoLink = `mailto:tuemail@dominio.com?subject=${subject}&body=${body}`;

    // Abrir el cliente de correo
    window.location.href = mailtoLink;

    // Limpiar el formulario
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-amber-400 mb-6">Contáctanos</h1>
      <p className="text-emerald-900 text-center mb-6">
        ¿Tienes preguntas? ¡Estamos aquí para ayudarte!
      </p>
      <form className="max-w-lg mx-auto bg-amber-400 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg p-2 mt-1 text-emerald-900"
            placeholder="Escribe tu nombre"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-medium">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg p-2 mt-1"
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-white font-medium">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Escribe tu mensaje aquí"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-900 text-white rounded-lg p-2 hover:bg-sky-500 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
