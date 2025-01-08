'use client'

import React from 'react';

const ReservaSkeleton = () => {
  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-emerald-900 mb-8">
          Reserva tu vehículo
        </h2>

        {/* Mensaje de error */}
        <div className="animate-pulse space-y-4 mb-6">
          <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
        </div>

        {/* Placeholder Para los detalles de los carros */}
        <div className="flex items-center mb-6 animate-pulse">
          <div className="w-1/3 h-32 bg-gray-300 rounded-lg"></div>
          <div className="ml-6 space-y-3 w-2/3">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>

        {/* Form con placeholders */}
        <form className="space-y-6 animate-pulse">
          <div className="flex items-center">
            <label className="block text-md font-medium text-emerald-900 w-1/3">
              Salida:
            </label>
            <div className="ml-4 w-2/3">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="block text-md font-medium text-emerald-900 w-1/3">
              Retorno:
            </label>
            <div className="ml-4 w-2/3">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Detalle del usuario */}
          <div className="space-y-4 pb-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
              <div className="w-1/2">
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
              <div className="w-1/2">
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
              <div className="w-1/2">
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Submit button */}
          <div className="h-12 bg-gray-300 rounded w-full"></div>
        </form>
      </div>
    </div>
  );
};

export default ReservaSkeleton;
