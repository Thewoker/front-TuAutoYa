"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // Redirige al inicio después de 5 segundos
    }, 8000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white text-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/7c/c0/c2/7cc0c2a1b86810b356f175b3d447b908.gif')",
      }}
    >
    
      <h1 className="text-4xl font-bold text-green-950 mb-4">
        404 - Página no encontrada
      </h1>
      <p className="text-lg">
        Lo sentimos, serás redirigido al inicio en 5 segundos...
      </p>
    </div>
  );
};

export default NotFound;
