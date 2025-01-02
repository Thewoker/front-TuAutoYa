'use client'
import Image from "next/image";
import { Star } from "lucide-react";
import { useParams } from "next/navigation"; 

import Link from 'next/link';
import { CarCarousel2 } from "@/components/Catalogo/carDetalle/CarCarrousel2";
import { getCars } from "@/api/getCars";
import { ResponseType } from "@/types/response";


function CarDetail() {

    const{loading, cars}: ResponseType = getCars()
    const { id } = useParams();
    // const cars: ICars[] = data.find((item) => item.cars)?.cars || [];
    const car = cars.find((car) => car.id === id);
    const filtro = car?.model || '';
    const carid = car?.id || '';
    const title = 'Modelos Relacionados';

    return (
        <div className="bg-white">
            <div className="pt-6">
                <div className="border-b flex flex-wrap items-baseline mx-auto max-w-2xl px-4 pb-5 pt-10 sm:px-6 lg:max-w-7xl">
                    <div className="flex-auto">
                        <h1 className="text-2xl font-bold tracking-tight text-emerald-900  sm:text-3xl">{car?.brand} {car?.model} del {car?.year}</h1>
                    </div>
                    <div>
                        <button className="flex items-center h-10 px-6 font-semibold border rounded-md bg-white" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <p className="ml-2 text-emerald-900 ">Compartir</p>
                        </button>
                    </div>
                </div>
                <div className="border-b mx-auto max-w-2xl px-4 pb-5 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-5 lg:pt-5">
                    <div className="lg:col-span-2 lg:border-gray-200 lg:pr-8">
                        <div className="img">
                        <div className="relative w-full h-96"> {/* Ajuste del contenedor */}
    <Image
        src={car?.image || "/placeholder-image.jpg"}
        alt={car?.model || "Imagen del coche"}
        layout="fill"
        objectFit="contain" // Cambiado de "cover" a "contain"
        className="object-center"
    />
</div>
                        </div>
                        <div className="mt-8 mb-8 p-3 border">
                            <div className="border-b pb-3 mb-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-emerald-900 ">Caracteristicas:</h3>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white border rounded-lg p-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                                    </svg>
                                    <p className="ml-2">Transmission: </p>
                                    <p>{car?.transmission}</p>
                                </div>
                                <div className="bg-white border rounded-lg p-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                                    </svg>
                                    <p className="ml-2">Kilometer: </p>
                                    <p>{car?.kilometer}</p>
                                </div>
                                <div className="bg-white border rounded-lg p-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                                    </svg>
                                    <p className="ml-2">Brakes: </p>
                                    <p>{car?.brakes}</p>
                                </div>
                                <div className="bg-white border rounded-lg p-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                                    </svg>
                                    <p className="ml-2">FuelType: </p>
                                    <p>{car?.fuelType}</p>
                                </div>
                                <div className="bg-white border rounded-lg p-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                                    </svg>
                                    <p className="ml-2">Status: </p>
                                    <p>{car?.status}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-8 mb-8 p-3 border">
                            <div className="border-b pb-3 mb-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">Descripción:</h3>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{car?.description}</p>
                            </div>
                        </div> */}
                    </div>

                    <div className="mt-4 lg:row-span-3 lg:mt-0 rounded-lg shadow-sm bg-white">
                        <div className="border p-5 mb-5">
                            <div className="border-b">
                                <h2 className="text-2xl text-emerald-900 ">Información del carro</h2>
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">Reviews: {car?.rating}</span>
                                    <Star className="h-4 w-4 fill-amber-500  text-amber-500" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-base text-gray-900">{car?.description}</p>
                            </div>
                        </div>

                        <div className="border p-5">
                            <div className="border-b">
                                <h2 className="text-2xl text-amber-400">Realizar Reserva</h2>
                            </div>
                            <div className="mt-3">
                                <p className="text-xl tracking-tight text-emerald-900">Precio por Día: $ {car?.pricePerDay}</p>
                            </div>
                            <div className="mt-3">
                                <Link href={`/Reserva/${car?.id}`}>
                                    <button
                                        type="button"
                                        className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-400 px-8 py-3 text-base font-medium text-white hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Reservar ahora
                                    </button>
                                </Link>
                            </div>
                            {/* <form className="mt-5">

                                <div className="flex items-center">
                                    <label className="block text-md font-medium text-emerald-900">Salida: </label>
                                    <div className="mt-2 ml-2">
                                        <input type="date" className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-primary focus:border-primary" />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <label className="block text-md font-medium text-emerald-900">Retorno: </label>
                                    <div className="mt-2 ml-2">
                                        <input type="date" className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-primary focus:border-primary" />
                                    </div>
                                </div>
                                <Link href="/Reserva">
                                <button
                                    type="button"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-400 px-8 py-3 text-base font-medium text-white hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Reservar ahora
                                </button>
                                </Link>
                            </form> */}
                        </div>
                    </div>
                </div>
                <div className="border-b flex flex-wrap items-baseline mx-auto max-w-2xl px-4 pb-5 pt-10 sm:px-6 lg:max-w-7xl">
                    <CarCarousel2 carid={carid} filtro={filtro} title={title}/>
                </div>
            </div>
        </div>
    );
}


export default CarDetail;