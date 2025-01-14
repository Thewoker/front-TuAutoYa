"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { useAuth } from "@/helpers/AuthContext";
import Search from "./Search";

const NavBar: React.FC = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   const userCookie = Cookies.get("user");
  //   setIsLoggedIn(userCookie != undefined || userCookie != null ? true : false);
  // }, []);

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
            <Image
              src="/Images/logo.png"
              alt="Logo"
              width={200}
              height={200}
              priority
            />
          </Link>

          {/* Links de navegación */}
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link
                href="/UltimasOfertas"
                className="text-white text-lg font-medium hover:text-amber-300 transition duration-300"
              >
                Últimas ofertas
              </Link>
            </li>
            <li>
              <Link
                href="/directorio"
                className="text-white text-lg font-medium hover:text-amber-400 transition duration-300"
              >
                Directorios de agencias
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo"
                className="text-white text-lg font-medium hover:text-amber-400 transition duration-300"
              >
                Renta de autos
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white text-lg font-medium hover:text-amber-400 transition duration-300"
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Botones */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="p-2 rounded-full bg-amber-400 text-emerald-950 hover:bg-sky-500 transition"
                title="Favoritos"
              >
                <span className="hidden md:block"> Dashboard </span>
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center p-2 bg-amber-400 text-emerald-950 rounded-full hover:bg-sky-500 focus:ring-2 focus:ring-amber-500 transition"
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
              <div className="flex space-x-2">
                <Link
                  href="/login"
                  className="flex items-center space-x-2 p-2 bg-amber-400 text-emerald-950 rounded-full hover:bg-sky-500 focus:ring-2 focus:ring-amber-500 transition"
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
                <Link
                  href="/register"
                  className="flex items-center space-x-2 p-2 bg-amber-400 text-emerald-950 rounded-full hover:bg-sky-500 focus:ring-2 focus:ring-gray-600 transition"
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
                      d="M16.5 9.75a6 6 0 11-9 0m9 0v6a3 3 0 01-6 0v-6"
                    />
                  </svg>
                  <span className="hidden md:block">Registro</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Segunda fila: Barra de búsqueda */}
        <div className="mt-4">
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
