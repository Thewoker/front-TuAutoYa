import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GraciasPorTuReserva = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirigir automáticamente a la página de reservas después de 3 segundos
    const timer = setTimeout(() => {
      router.push('/Reserva');
    }, 3000);

    // Limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600">¡Gracias por tu reserva!</h1>
      <p className="text-lg mt-4">Tu reserva ha sido confirmada correctamente.</p>
      <p className="mt-2 text-md text-gray-600">Serás redirigido a tus reservas en breve...</p>
    </div>
  );
};

export default GraciasPorTuReserva;
