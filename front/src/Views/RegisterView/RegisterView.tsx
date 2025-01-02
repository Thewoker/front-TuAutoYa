'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth } from '../../firebase.config';

const RegisterView = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const provider = new GoogleAuthProvider();

  // Maneja el registro con email y contraseña
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login'); // Redirigir al login después de registro exitoso
    } catch (err: any) {
      console.error('Error al registrar usuario:', err.message);
      setError('Error al registrar. Verifica tus datos e intenta nuevamente.');
    }
  };

  // Maneja el inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // Redirige al dashboard si el inicio de sesión es exitoso
    } catch (err: any) {
      console.error('Error al iniciar sesión con Google:', err.message);
      setError('No se pudo autenticar con Google. Intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-amber-400 ">Crea tu cuenta</h1>
      <form onSubmit={handleRegister} className="w-full max-w-sm bg-emerald-900 p-6 rounded shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-sky-400 text-white font-medium rounded-md hover:bg-amber-500"
        >
          Registrarse
        </button>
      </form>

      <div className="mt-6">
        <p className="mb-4 text-emerald-900"> También puedes  regístrate con:</p>
        <button
          onClick={handleGoogleSignIn}
          className="w-full px-4 py-2 bg-amber-400 text-white font-medium rounded-md hover:bg-sky-500"
        >
          Continuar con Google
        </button>
      </div>
      <p className="mt-4 text-amber-500">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-emerald-900 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
};

export default RegisterView;
