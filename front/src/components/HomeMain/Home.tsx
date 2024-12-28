"use client";

import React, { useState } from "react";

const Home: React.FC = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Fecha de inicio:", startDate);
        console.log("Fecha de entrega:", endDate);
        // Aquí podrías agregar la lógica para enviar estos datos a una API o hacer una búsqueda
    };

    return (
        <div className="relative">

            {/* Contenido principal */}
            <section
                className="relative bg-cover bg-center p-6"
                style={{
                    backgroundImage: 'url("https://i.pinimg.com/236x/77/30/4d/77304da07fcc3127d0835aea9138cca2.jpg")',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    height: '100vh',
                }}
            >
                
            </section>

            {/* Barra de búsqueda centrada */}
            <div className="p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4">
                <form onSubmit={handleSubmit} className="p-4 flex space-x-4 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-4xl mx-auto">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="p-2 rounded-md border border-gray-300"
                        placeholder="Fecha de inicio"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="p-2 rounded-md border border-gray-300"
                        placeholder="Fecha de entrega"
                    />
                    <button
                        type="submit"
                        className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600 transition"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {/* Imágenes redondeadas en el lado derecho */}
            <div className="absolute top-24 right-0 flex flex-col space-y-4 p-14 z-20">
                {/* Imagen 1 */}
                <img
                    src="https://media.istockphoto.com/id/528474010/es/foto/recuerdos-de-hacer.jpg?s=612x612&w=0&k=20&c=UMcoCWmqpi2EVYP5nU__6SsJq-cZhHjthEb7IRtXGnA="
                    alt="Recuerdos"
                    className="w-32 h-32 object-cover rounded-3xl transform rotate-6"
                />
                {/* Imagen 2 */}
                <img
                    src="https://media.istockphoto.com/id/469256990/es/foto/afro-chica-con-amigos-en-un-viaje-por-carretera-al-atardecer.jpg?s=612x612&w=0&k=20&c=gR4SnWl5g-5thFHEPwLJLL6oQ9cBt1P5OAxb66Si5J8="
                    alt="Amigos en viaje"
                    className="w-32 h-32 object-cover rounded-3xl transform -rotate-6"
                />
                {/* Imagen 3 */}
                <img
                    src="https://www.rcnradio.com/_next/image?url=https%3A%2F%2Ffiles.rcnradio.com%2Fpublic%2Fstyles%2F16_9%2Fpublic%2F2021-12%2Fviajar%2520por%2520carretera.jpg%3FVersionId%3DA.p3QmSyWYCOhH7zq8Zb0oi8lEvzWh1lmS9orJcJ_hJk%26itok%3DzXAlp8sa&w=1920&q=75"
                    alt="Viaje"
                    className="w-32 h-32 object-cover rounded-3xl"
                />
            </div>
        </div>
    );
};

export default Home;
