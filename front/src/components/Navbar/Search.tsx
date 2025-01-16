import { useGetCars } from '@/api/getCars'
import { ResponseType } from '@/types/response'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SearchSkeleton } from './SearchSkeleton';

export default function Search() {
    const {loading, cars}:ResponseType = useGetCars();
    const router = useRouter();
    // Estados locales para los filtros
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    // Obtener marcas únicas de los datos
    const brands = Array.from(new Set(cars.map((car) => car.brand)));

    // Filtrar modelos basados en la marca seleccionada
    const models = selectedBrand
        ? Array.from(new Set(cars.filter((car) => car.brand === selectedBrand).map((car) => car.model)))
        : [];

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Búsqueda realizada con:', { selectedBrand, selectedModel });
        // Construir los parámetros de consulta
        const queryParams = new URLSearchParams({
            brand: selectedBrand,
            model: selectedModel,
        });

        // Redirigir a la página de catálogo
        router.push(`/catalogo?${queryParams.toString()}`);
    };

    if (loading) {
        return <SearchSkeleton />;
    }
    return (
        <div>
            <form
             onSubmit={handleSubmit}   
             className="flex items-center max-w-3xl mx-auto bg-white rounded-lg shadow p-3">
                <input
                    type="text"
                    // defaultValue="Bogotá, Distrito Capital, Colombia"
                    placeholder="Bogotá, Distrito Capital, Colombia"
                    className="p-2 flex-1 text-emerald-900 text-sm border-none outline-none rounded-l-lg"
                />
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="p-2 text-sm border-none text-emerald-900"
                >
                    <option value="">Seleccione una marca</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="p-2 text-sm border-none text-emerald-900"
                    disabled={!selectedBrand} // Deshabilitar si no hay marca seleccionada
                >
                    <option value="">Seleccione un modelo</option>
                    {models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-amber-400 text-white text-sm px-4 py-2 rounded-r-lg hover:bg-sky-500 transition"
                >
                    Buscar
                </button>
            </form>
        </div>
    )
}
