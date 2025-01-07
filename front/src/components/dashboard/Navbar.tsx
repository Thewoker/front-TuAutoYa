import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-6 border-b bg-white">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-96">
        <input
          type="text"
          placeholder="Buscar"
          className="bg-gray-100 outline-none w-full"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-300 text-white rounded-full">
          L
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

