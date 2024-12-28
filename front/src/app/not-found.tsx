
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000); // Redirigir después de 5 segundos
        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center">
            <img
                src="https://i.pinimg.com/236x/a7/b2/bc/a7b2bcd5b52eaac6fd44f9ca39d10b66.jpg"
                alt="404 Not Found"
                className="max-w-full h-auto mb-6 rounded-lg shadow-lg"
            />
            <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Página no encontrada</h1>
            <p className="text-lg">
                Lo sentimos, serás redirigido al inicio en 5 segundos...
            </p>
        </div>
    );
};

export default NotFound;
