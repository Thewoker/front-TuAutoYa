import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-gray-200 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* About Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Sobre Nosotros</h3>
          <p className="text-sm text-gray-400">
            Tu sitio confiable para encontrar las mejores ofertas en autos. 
            Conecta con agencias y usuarios para una experiencia increíble.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.56v14.91a4.51 4.51 0 01-4.56 4.47H4.56A4.51 4.51 0 010 19.47V4.56A4.51 4.51 0 014.56 0h14.91A4.51 4.51 0 0124 4.56z" />
                <path d="M9.4 17.58v-5.7H6.79v-2.2h2.61v-1.73a3.92 3.92 0 012.45-4.28 15.3 15.3 0 014.52 0v2.13a6.6 6.6 0 00-2.43-.46 1.32 1.32 0 00-1.41 1.48v1.79h3.13l-.43 2.2h-2.7v5.7h-2.9z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.56v14.91a4.51 4.51 0 01-4.56 4.47H4.56A4.51 4.51 0 010 19.47V4.56A4.51 4.51 0 014.56 0h14.91A4.51 4.51 0 0124 4.56z" />
                <path d="M12 4.48a7.52 7.52 0 107.52 7.52A7.52 7.52 0 0012 4.48zm0 13.16a5.64 5.64 0 115.64-5.64 5.64 5.64 0 01-5.64 5.64z" />
                <circle cx="12" cy="12" r="2.73" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.56v14.91a4.51 4.51 0 01-4.56 4.47H4.56A4.51 4.51 0 010 19.47V4.56A4.51 4.51 0 014.56 0h14.91A4.51 4.51 0 0124 4.56z" />
                <path d="M19.34 12.12l-7.7-5.07a.73.73 0 00-1.1.61v10.1a.73.73 0 001.1.61l7.7-5.07a.73.73 0 000-1.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/UltimasOfertas" className="hover:text-white">
                Últimas ofertas
              </a>
            </li>
            <li>
              <a href="/directorio" className="hover:text-white">
                Directorio de Agencias
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contacto
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                Sobre Nosotros
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Teléfono: + 57  (555) 123-4567</li>
            <li>Email: support@TuAutoYa.com</li>
            <li>Ubicación: Bogotá - colombia</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Suscríbete</h3>
          <p className="text-sm text-gray-400 mb-4">
            Recibe las últimas ofertas y actualizaciones en tu correo.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="p-2 rounded-l-lg w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="p-2 bg-amber-500 text-white rounded-r-lg hover:bg-amber-600 focus:ring-2 focus:ring-amber-500">
              Suscribirme
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-gray-400">
        <p>&copy; 2024 TuAutoYa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
