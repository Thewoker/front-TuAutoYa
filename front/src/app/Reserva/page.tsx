
function Reserva() {
    return (
      <div>
        <form className="mt-5">

<div className="flex items-center">
    <label className="block text-md font-medium text-gray-900">Salida: </label>
    <div className="mt-2 ml-2">
        <input type="date" className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-primary focus:border-primary" />
    </div>
</div>

<div className="flex items-center">
    <label className="block text-md font-medium text-gray-900">Retorno: </label>
    <div className="mt-2 ml-2">
        <input type="date" className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-primary focus:border-primary" />
    </div>
</div>

<button
    type="submit"
    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
    Reservar ahora
</button>
</form>
      </div>
    );
  }
  export default Reserva;
  