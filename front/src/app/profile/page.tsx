// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Importa el componente Image de Next.js

const Profile = () => {
  const [email] = useState("usuario@ejemplo.com"); // Simulación del email del usuario logueado
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  // Cargar el avatar desde Local Storage cuando se monta el componente
  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  // Manejar el cambio de avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatar(reader.result); // Actualiza el estado del avatar
          localStorage.setItem("avatar", reader.result); // Guarda el avatar en Local Storage
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    alert("Sesión cerrada");
    router.push("/login");
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        alert("Contraseña cambiada con éxito");
        setShowPasswordModal(false);
        setNewPassword("");
      } else {
        const data = await response.json();
        alert(data.message || "Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4 text-emerald-950">Perfil del usuario</h1>
        <div className="mb-4">
          <label htmlFor="avatarInput">
            {avatar ? (
              <Image
                src={avatar}
                alt="Avatar del usuario"
                width={128} // Ancho de la imagen
                height={128} // Alto de la imagen
                className="w-32 h-32 rounded-full object-cover mx-auto cursor-pointer"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mx-auto cursor-pointer">
                <span className="text-gray-700">Subir avatar</span>
              </div>
            )}
          </label>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <p className="mb-4">
          Correo: <span className="font-semibold">{email}</span>
        </p>

        <div className="flex space-x-4">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-amber-400 text-white rounded hover:bg-emerald-950"
          >
            Cambiar contraseña
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-amber-400"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Modal para cambio de contraseña */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-amber-400 text-white rounded hover:bg-emerald-950"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
