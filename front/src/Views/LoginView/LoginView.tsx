

"use client"; // Agrega esta línea al inicio del archivo

import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para el login
    console.log(formData);
  };

  return (
    <div className=" pl-20 ml-15 min-h-screen flex items-center justify-center "
   >
      <div className="bg-zinc-200  p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6 ">
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
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?{' '}
            <a href="/register" className="text-green-900 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
