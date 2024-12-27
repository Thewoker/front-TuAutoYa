'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

const Dashboard = () => {
    const router = useRouter();

    // Esta función se encarga de cerrar la sesión
    const handleLogout = async () => {
        try {
            await signOut(auth); // Cierra la sesión del usuario en Firebase
            router.push('/Login'); // Redirige a la página de login
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    useEffect(() => {
        // Verifica si hay un usuario autenticado
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/Login'); // Redirige si no hay usuario autenticado
            }
        });

        return () => unsubscribe(); // Limpia el listener al desmontar el componente
    }, [router]);

    return (
        <div className="mt-4 text-center">
            <h1>Welcome to the Dashboard</h1>
            <button
                onClick={handleLogout}
                className="mt-4 py-2 px-4 bg-amber-400 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;