"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {


    const userCookie = Cookies.get("user");

    setIsLoggedIn(!!userCookie);
  }, []);

  const handleLogout = () => {


    Cookies.remove("user");
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    router.push("/");

  };

  return (
    <nav
      className="bg-cover bg-center shadow-md"
      style={{
        backgroundImage: 'url("/Images/appBackground.jpg")',
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        zIndex: 10,
      }}
    >
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Primera fila: Logo y Links */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img
              src="/images/logo (2).png"
              alt="Logo"
              className="h-12"
              style={{ height: "200px" }}
            />
          </Link>

          {/* Links de navegación */}
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link
                href="/UltimasOfertas"
                className="text-white text-lg font-medium hover:text-amber-500 transition duration-300"
              >
                Últimas ofertas
              </Link>
            </li>
            <li>
              <Link
                href="/directorio"
                className="text-white text-lg font-medium hover:text-amber-500 transition duration-300"
              >
                Directorios de agencias
              </Link>
            </li>
            <li>
              <Link
                href="/rentaAutos"
                className="text-white text-lg font-medium hover:text-amber-500 transition duration-300"
              >
                Renta de autos
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white text-lg font-medium hover:text-amber-500 transition duration-300"
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Botones */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <Link
                href="/favoritos"
                className="p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 transition"
                title="Favoritos"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.48 6.48 0 0119.5 3C22.58 3 25 5.42 25 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}

                className="flex items-center  p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 transition"


              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A3.75 3.75 0 0012 1.5 3.75 3.75 0 008.25 5.25V9M12 12.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  />
                </svg>
                <span className="hidden md:block">Cerrar sesión</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25a3.75 3.75 0 10-7.5 0V9m7.5 0A3.75 3.75 0 0112 12.75m7.5 0v8.25a3.75 3.75 0 01-3.75 3.75h-6A3.75 3.75 0 015.25 21v-8.25m0 0A3.75 3.75 0 0112 9m0 3.75A3.75 3.75 0 0115.75 9"
                  />
                </svg>
                <span className="hidden md:block">Iniciar sesión</span>
              </Link>
            )}
          </div>
        </div>

        {/* Segunda fila: Barra de búsqueda */}
        <div className="mt-4">
          <form className="flex items-center max-w-3xl mx-auto bg-white rounded-lg shadow p-3">
            <input
              type="text"
              defaultValue="Bogotá, Distrito Capital, Colombia"
              placeholder="Ciudad"
              className="p-2 flex-1 text-emerald-900 text-sm border-none outline-none rounded-l-lg"
            />
            <input
              type="date"
              defaultValue="2024-12-24"
              className="p-2 text-sm border-none text-emerald-900"
            />
            <select
              defaultValue="12:00"
              className="p-2 text-sm border-none text-emerald-900"
            >
              <option value="12:00">Mediodía</option>
              <option value="06:00">Mañana</option>
              <option value="18:00">Tarde</option>
            </select>
            <input
              type="date"
              defaultValue="2024-12-31"
              className="p-2 text-sm border-none text-emerald-900"
            />
            <select
              defaultValue="12:00"
              className="p-2 text-sm border- text-emerald-900"
            >
              <option value="12:00">Mediodía</option>
              <option value="06:00">Mañana</option>
              <option value="18:00">Tarde</option>
            </select>
            <button
              type="submit"
              className="bg-amber-500 text-white text-sm px-4 py-2 rounded-r-lg hover:bg-sky-500 transition"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

