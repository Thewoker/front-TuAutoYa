
import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Página no encontrada</p>
      <p className="text-md text-gray-600 mb-6">Lo siento, no pudimos encontrar la página que buscas.</p>
      <Link href="/">
        <a className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-400 transition duration-300">
          Volver al inicio
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
