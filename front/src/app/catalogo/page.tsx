'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { CarList } from '@/components/Catalogo/CarList'
import Car from '@/Interfaces/ICar'

const sortOptions = [
    { name: 'Most Popular', value: 'popular', current: true },
    { name: 'Best Rating', value: 'rating', current: false },
    { name: 'Newest', value: 'newest', current: false },
    { name: 'Price: Low to High', value: 'priceLowToHigh', current: false },
    { name: 'Price: High to Low', value: 'priceHighToLow', current: false },
]

function classNames(...classes: (string | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
}

export default function CatalogPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Estado para filtros seleccionados
    const [selectedFilters, setSelectedFilters] = useState({
        brand: new Set<string>(),
        model: new Set<string>(),
        year: new Set<string>(),
        transmission: new Set<string>(),
    });

    // Estado para el orden seleccionado
    const [selectedSort, setSelectedSort] = useState<string>('popular');
    
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/cars');
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const filters = [
        {
            id: 'brand',
            name: 'Brand',
            options: Array.from(new Set(cars.map(car => car.brand))),
        },
        {
            id: 'model',
            name: 'Model',
            options: Array.from(new Set(cars.map(car => car.model))),
        },
        {
            id: 'year',
            name: 'Year',
            options: Array.from(new Set(cars.map(car => car.year))),
        },
        {
            id: 'transmission',
            name: 'Transmission',
            options: Array.from(new Set(cars.map(car => car.transmission))),
        },
    ];
    
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Manejo de cambios en los filtros
    const handleFilterChange = (id: string, value: string) => {
        setSelectedFilters(prev => {
            const updated = new Set(prev[id as keyof typeof selectedFilters]);
            if (updated.has(value)) {
                updated.delete(value);
            } else {
                updated.add(value);
            }
            return { ...prev, [id]: updated };
        });
    };

    // Filtrar autos en función de los filtros seleccionados
    const filteredCars = cars.filter(car => {
        return (
            (!selectedFilters.brand.size || selectedFilters.brand.has(car.brand)) &&
            (!selectedFilters.model.size || selectedFilters.model.has(car.model)) &&
            (!selectedFilters.year.size || selectedFilters.year.has(car.year)) &&
            (!selectedFilters.transmission.size || selectedFilters.transmission.has(car.transmission))
        );
    });

    // Función para ordenar los autos
    const sortCars = (cars: Car[]) => {
        switch (selectedSort) {
            case 'rating':
                return [...cars].sort((a, b) => b.rating - a.rating);
            case 'newest':
                return [...cars].sort((a, b) => parseInt(b.year) - parseInt(a.year));
            case 'priceLowToHigh':
                return [...cars].sort((a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay));
            case 'priceHighToLow':
                return [...cars].sort((a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay));
            default:
                return cars;
        }
    };

    const sortedCars = sortCars(filteredCars);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const paginatedCars = sortedCars.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
    }

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Filtros</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <button
                                                    onClick={() => setSelectedSort(option.value)}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    {option.name}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <div className="-m-2 ml-5 p-2 text-gray-500 sm:ml-7">
                                Total de carros: {filteredCars.length}
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filtros</span>
                                <FunnelIcon className="size-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Cars
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                {filters.map(filter => (
                                    <Disclosure key={filter.id} as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{filter.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon className="size-5" aria-hidden="true" />
                                                    <MinusIcon className="size-5 hidden" aria-hidden="true" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {filter.options.map((option) => (
                                                    <div key={option} className="flex items-center">
                                                        <input
                                                            id={`${filter.id}-${option}`}
                                                            name={`${filter.id}[]`}
                                                            type="checkbox"
                                                            checked={selectedFilters[filter.id as keyof typeof selectedFilters].has(option)}
                                                            onChange={() => handleFilterChange(filter.id, option)}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`${filter.id}-${option}`}
                                                            className="ml-3 text-sm text-gray-600"
                                                        >
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <CarList cars={paginatedCars} />
                                <div className="flex justify-between items-center mt-6">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border rounded text-sm text-gray-600 disabled:opacity-50"
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border rounded text-sm text-gray-600 disabled:opacity-50"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

