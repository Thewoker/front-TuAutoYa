// pages/unete-como-proveedor.tsx

import Link from "next/link";

const UneteComoProveedor = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://i.pinimg.com/originals/62/a5/70/62a5701185eb5b2368af21961665fff1.gif")',
      }}
    >
      <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
        <div className="text-white text-center p-8 rounded-lg shadow-lg bg-opacity-80 bg-black">
          <h1 className="text-3xl font-semibold mb-4">¡Únete como proveedor!</h1>
          <p className="mb-6 text-lg">
            ¿Quieres ser parte de nuestro equipo? ¡Regístrate ahora!
          </p>

          <div className="flex justify-center space-x-4 mb-6">
            <Link
              href="/login"
              className="bg-amber-400 text-white px-6 py-2 rounded-lg hover:bg-sky-500 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="bg-amber-400 text-white px-6 py-2 rounded-lg hover:bg-sky-500 transition"
            >
              Registrar
            </Link>
          </div>

          <div className="mt-6">
            <p className="text-lg">Para más información, contáctanos:</p>
            <p className="font-semibold">+57 300 123 4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UneteComoProveedor;
