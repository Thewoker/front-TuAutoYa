'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth } from '../../firebase.config';
import { FirebaseError } from 'firebase/app'; // Importa el tipo FirebaseError

const RegisterView = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uname, setName] = useState('');
  const [identity, setIdentity] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const provider = new GoogleAuthProvider();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Extraer datos del usuario registrado por Firebase
      const firebaseUser = userCredential.user;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: uname,
          identity,
          city,
          phone,
          email: firebaseUser.email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo registrar el usuario en la base de datos');
      }
      router.push('/login'); // Redirigir al login después de registro exitoso
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/email-already-in-use') {
          setError('El correo electrónico ya está registrado. Usa otro o inicia sesión.');
        } else {
          console.error('Error al registrar usuario:', err.message);
          setError('Error al registrar. Verifica tus datos e intenta nuevamente.');
        }
      } else {
        console.error('Error desconocido:', err);
        setError('Error desconocido. Intenta nuevamente.');
      }
    }
  };

  // Maneja el inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // Redirige al dashboard si el inicio de sesión es exitoso
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        console.error('Error al iniciar sesión con Google:', err.message);
        setError('No se pudo autenticar con Google. Intenta de nuevo.');
      } else {
        console.error('Error desconocido:', err);
        setError('Error desconocido. Intenta nuevamente.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 mt-4 text-amber-400 ">Crea tu cuenta</h1>
      <form onSubmit={handleRegister} className="w-full max-w-2xl bg-emerald-900 p-6 rounded shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>
            <h2 className="text-base/7 font-semibold text-white">Datos Personales</h2>
            <hr className='pb-5'/>
            <div className='flex flex-wrap gap-4'>
              <div className="flex-auto mb-4">
                <label htmlFor="uname" className="block text-sm font-medium text-white">
                  Nombre
                </label>
                <input
                  id="uname"
                  type="uname"
                  value={uname}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex-auto mb-4">
                <label htmlFor="identity" className="block text-sm font-medium text-white">
                  Número de Identidad
                </label>
                <input
                  id="identity"
                  type="identity"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex-auto mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-white">
                  Ciudad
                </label>
                <input
                  id="city"
                  type="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex-auto mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-white">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-base/7 font-semibold text-white">Datos de acceso a TuAutoYa</h2>
            <hr className='pb-5'/>
            <div className='flex flex-wrap gap-4'>
              <div className="flex-auto mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white">
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
              <div className="flex-auto mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-white">
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
            </div>
          </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-sky-400 text-white font-medium rounded-md hover:bg-amber-500"
        >
          Registrarse
        </button>
      </form>

      <div className="mt-6">
        <p className="mb-4 text-emerald-900"> También puedes registrarte con:</p>
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
