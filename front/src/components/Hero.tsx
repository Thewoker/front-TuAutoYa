'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const messages = [
    "Alquila el coche perfecto para tu próxima aventura",
    "Descubre la libertad de viajar a tu ritmo",
    "Experimenta la comodidad y el lujo en cada viaje",
    "Explora nuevos horizontes con nuestros vehículos de calidad",
    "Viaja con confianza: coches seguros y bien mantenidos",
    "Flexibilidad y comodidad en cada kilómetro",
    "Tu viaje, tus reglas: elige el coche que se adapte a ti",
    "Haz que cada viaje sea inolvidable con nuestros coches",
    "Descubre el placer de conducir con nuestra flota premium",
    "Ahorra tiempo y dinero con nuestras ofertas exclusivas",
    "Viaja sin preocupaciones con nuestro servicio de atención 24/7",
    "Desde compactos hasta SUVs: tenemos el coche ideal para ti",
    "Experimenta la libertad de la carretera abierta"
]

export function Hero() {
    const [currentMessage, setCurrentMessage] = useState(0)
    const [displayedMessage, setDisplayedMessage] = useState(messages[0])
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsTransitioning(true)
            setTimeout(() => {
                setCurrentMessage((prev) => (prev + 1) % messages.length)
            }, 600) // Espera a que la transición de salida termine
        }, 10000) // Cambia el mensaje cada 10 segundos

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        setIsTransitioning(true)
        const timeoutId = setTimeout(() => {
            setDisplayedMessage(messages[currentMessage])
            setIsTransitioning(false)
        }, 500) // Coincide con la duración de la transición CSS

        return () => clearTimeout(timeoutId)
    }, [currentMessage])

    return (
        <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
            <img
                src="/Images/hero-bg.jpeg"
                alt="Fondo de coches"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                        <span className="block xl:inline">Rentcars</span>
                    </h1>
                    <p
                        className={`mt-3 text-base text-white sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'
                            }`}
                    >
                        {displayedMessage}
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                        <div className="rounded-md shadow">
                            <Link
                                href="/catalogo"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 md:py-4 md:px-10 md:text-lg"
                            >
                                Reserva ahora
                            </Link>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                            <Link
                                href="#FAQ"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-orange-600 hover:bg-orange-50 md:py-4 md:px-10 md:text-lg"
                            >
                                Más información
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

