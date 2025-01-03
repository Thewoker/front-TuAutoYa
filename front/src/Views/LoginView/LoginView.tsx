"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase.config";
import { useRouter } from "next/navigation"; // Importa useRouter
import Cookies from 'js-cookie';

const LoginView = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter(); // Inicializa useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => { // --> Server Action(recommended)
    e.preventDefault();
    // Aquí puedes implementar tu lógica para autenticación con email y contraseña
    // Si el login con email y password es exitoso:
    // router.push("/dashboard");

    try {
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = result.user;
      const token = await user.getIdToken();

      await sendTokenToBackend(token);

      router.push('/dashboard')
    }catch (error) {
      console.error("Error al iniciar sesión con email y contraseña:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      // console.log("Usuario autenticado:", user);

      await sendTokenToBackend(token); // Enviar el token al backend
      router.push('/dashboard'); // Redirigir a la página de dashboard
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const sendTokenToBackend = async (token: string) => { // --> Lib/utils
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
      }); // Enviar el token al backend

      if (!response.ok) {
        throw new Error('Error al verificar el token');
      }

      // Aquí puedes manejar lo que el backend responda
      const data = await response.json();
      console.log('Token verificado en el backend:', data);

      // Almacenar la información en las cookies
      if (data.token) {
        Cookies.set('authToken', data.token, { expires: 7 }); // La cookie expirará en 7 días
      }
      if (data.user) {
        Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
      }

    } catch (error) {
      console.error("Error: ", error);
      console.error('Hubo un problema al enviar el token al backend');
    }
  };

  return (
    <div className="pl-20 ml-15 min-h-screen flex items-center justify-center">
      <div className="bg-zinc-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-green-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-green-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-sky-500 text-white rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-2 bg-amber-400 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Login with Google
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-green-900 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
