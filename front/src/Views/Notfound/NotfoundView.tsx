// app/notfound.tsx

import Image from 'next/image';
import Link from 'next/link';

const NotFoundView = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md">
        <Image
          src="/path_to_your_image.jpg" // Reemplaza esta ruta con la imagen que quieras usar
          alt="404 Image"
          width={400}
          height={300}
          className="mx-auto mb-4 rounded-lg"
        />
        <h1 className="text-3xl font-bold text-gray-700 mb-4">¡Ups! Página no encontrada</h1>
        <p className="text-lg text-gray-500 mb-6">La página que buscas no existe o ha sido movida.</p>
        <Link href="/" passHref>
          <a className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg transition">
            Volver a la página de inicio
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundView;

