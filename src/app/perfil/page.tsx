
"use client"
import React, { useState, useEffect } from "react";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ email: string | null }>({ email: null });

  useEffect(() => {
    // Simula obtener los datos del usuario desde un servicio o contexto
    setUser({
      email: "tuemail@gmail.com", // Reemplaza esto con la lógica real para obtener el correo del usuario
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-emerald-900">Perfil</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-xl font-semibold mb-2">Información del Usuario</h2>
        <p className="text-lg">Correo: {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
