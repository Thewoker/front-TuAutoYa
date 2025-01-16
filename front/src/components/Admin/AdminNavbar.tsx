import Link from 'next/link'

export function AdminNavbar() {
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
                            src="https://res.cloudinary.com/dz3eaevmu/image/upload/v1737051495/w46hlkh8xloqaouwowzy.png"
                            alt="Logo"
                            className="h-12"
                            style={{ height: "200px" }}
                        />
                    </Link>

                    {/* Links de navegación */}
                    <ul className="hidden md:flex space-x-6 items-center">
                        <li>
                            <Link
                                href='/admin/caja'
                                className="text-white text-lg font-medium hover:text-amber-500 transition duration-300"
                            >
                                Caja
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/admin/usuarios'
                                className="text-white text-lg font-medium hover:text-amber-500 transition duration-300"
                            >
                                Usuarios
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/admin/vehiculos'
                                className="text-white text-lg font-medium hover:text-amber-500 transition duration-300"
                            >
                                Vehículos
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/admin/reservas'
                                className="text-white text-lg font-medium hover:text-amber-500 transition duration-300"
                            >
                                Reservas
                            </Link>
                        </li>
                    </ul>

                    {/* Botones */}
                    <div className="flex items-center space-x-4">
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
                    </div>
                </div>
            </div>
        </nav>
    )
}