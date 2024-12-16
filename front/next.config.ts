// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.pinimg.com'], // Permite cargar imágenes de pinimg.com
  },
  experimental: {
    appDir: true, // Asegúrate de que appDir esté habilitado para App Routing
  },
};


