"use client";

import React, { useState } from "react";


const HomeView: React.FC = () => {
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
            {/* Barra de navegación */}
            

           

            {/* Barra de búsqueda centrada */}
            <div className="p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4">
                <form onSubmit={handleSubmit} className="p-4 flex space-x-4 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
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

        
        </div>
    );
};

export default HomeView;
