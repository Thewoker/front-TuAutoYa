'use client'

import { useState } from 'react'
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
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import data from '@/helpers/data'
import { CarList } from '@/components/CarList'
import ICars from '@/Interfaces/ICars'

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

export default function Example() {
    const cars:ICars[] = data.find(item => item.cars)?.cars || [];
    
    // Estado para filtros seleccionados
    const [selectedFilters, setSelectedFilters] = useState({
        brand: new Set<string>(),
        model: new Set<string>(),
        year: new Set<string>(),
        transmission: new Set<string>(),
    });

    // Estado para el orden seleccionado
    const [selectedSort, setSelectedSort] = useState<string>('popular');
    
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
            options: Array.from(new Set(cars.map(car => car.year.toString()))),
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
            (!selectedFilters.year.size || selectedFilters.year.has(car.year.toString())) &&
            (!selectedFilters.transmission.size || selectedFilters.transmission.has(car.transmission))
        );
    });

    // Función para ordenar los autos
    const sortCars = (cars: ICars[]) => {
        switch (selectedSort) {
            case 'rating':
                return [...cars].sort((a, b) => b.rating - a.rating);
            case 'newest':
                return [...cars].sort((a, b) => b.year - a.year); 
            case 'priceLowToHigh':
                return [...cars].sort((a, b) => a.pricePerDay - b.pricePerDay); 
            case 'priceHighToLow':
                return [...cars].sort((a, b) => b.pricePerDay - a.pricePerDay); 
            default:
                return cars; 
        }
    };

    const sortedCars = sortCars(filteredCars);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    // Calcular los autos visibles según la página actual
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
                                    aria-hidden="true"
                                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                </MenuButton>
                                </div>

                                <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                        <MenuItem key={option.name}>
                                            <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedSort(option.value); // Cambiar el orden seleccionado
                                            }}
                                            className={classNames(
                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                                            )}
                                            >
                                            {option.name}
                                            </button>
                                        </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="size-5" />
                            </button> */}
                            <div className="-m-2 ml-5 p-2 text-gray-500 sm:ml-7">
                                Total de carros: {filteredCars.length}
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filtros</span>
                                <FunnelIcon aria-hidden="true" className="size-5" />
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
                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">{filter.name}</span>
                                        <span className="ml-6 flex items-center">
                                        <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                        <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                                        </span>
                                    </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-4">
                                            {filter.options.map((option) => (
                                                <div key={option} className="flex gap-3">
                                                    <div className="flex h-5 shrink-0 items-center">
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input
                                                        // defaultValue={option.value}
                                                        // defaultChecked={option.checked}
                                                        id={`${filter.id}-${option}`}
                                                        name={`${filter.id}[]`}
                                                        type="checkbox"
                                                        checked={selectedFilters[filter.id as keyof typeof selectedFilters].has(option)}
                                                        onChange={() => handleFilterChange(filter.id, option)}
                                                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                        />
                                                        <svg
                                                        fill="none"
                                                        viewBox="0 0 14 14"
                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                        >
                                                        <path
                                                            d="M3 8L6 11L11 3.5"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 group-has-[:checked]:opacity-100"
                                                        />
                                                        <path
                                                            d="M3 7H11"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                        />
                                                        </svg>
                                                    </div>
                                                    </div>
                                                    <label htmlFor={`${filter.id}-${option}`} className="text-sm text-gray-600">
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
                                <CarList cars={paginatedCars}/>
                                <div className="flex justify-between items-center mt-6">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border rounded text-sm text-gray-600 disabled:opacity-50"
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        Página {currentPage} a {totalPages}
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
