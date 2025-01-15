"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app"; 
import { auth, googleProvider } from "@/firebase.config";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useAuth } from "@/helpers/AuthContext";

const LoginView = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso:", userCredential.user);

      // Obtener token del usuario
      const token = await userCredential.user.getIdToken();
      await sendTokenToBackend(token);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            throw new Error("Usuario no encontrado. Verifica tu email.");
          case "auth/wrong-password":
            throw new Error("Contraseña incorrecta. Intenta nuevamente.");
          default:
            throw new Error("Hubo un problema al iniciar sesión. Intenta más tarde.");
        }
      }
      console.error("Error en login:", error);
      throw new Error("Error desconocido al iniciar sesión.");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
      setIsLoggedIn(true);
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error en el inicio de sesión con email y contraseña:", error.message);
        setError(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      await sendTokenToBackend(token);
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // Aquí capturamos específicamente el error de popup cancelado
        if (error.code === "auth/cancelled-popup-request") {
          console.error("El inicio de sesión fue cancelado por el usuario.");
          setError("El inicio de sesión fue cancelado. Por favor intenta nuevamente.");
        }
      }

      if (error instanceof Error) {
        console.error("Error al iniciar sesión con Google:", error.message);
        setError("Error al iniciar sesión con Google. Intenta nuevamente.");
      }
    }
  };

  const sendTokenToBackend = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al verificar el token');
      }
      
      const data = await response.json();
      console.log('Token verificado en el backend:', data);

      if (data.token) {
        Cookies.set('authToken', data.token, { expires: 7 });
      }
      if (data.user) {
        Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Hubo un problema al enviar el token al backend:', error.message);
        setError("Hubo un problema con el servidor. Intenta más tarde.");
      }
    }
  };

  return (
    <div className="pl-20 ml-15 min-h-screen flex items-center justify-center">
      <div className="bg-emerald-900 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sky-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-amber-400">
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
          className="w-full mt-4 py-2 bg-amber-400 text-white rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Login with Google
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-white m-1">
            No tienes una cuenta?{" "}
            <a href="/register" className="p-2 text-amber-500 hover:text bg-emerald-900">
              Registro
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
