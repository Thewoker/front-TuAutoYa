import React from "react"

export function BrandShowcase() {
    const brands = [
        {
            name: "Audi",
            logo: "/Images/audi-logo.png",
            backgroundImage: "/Images/audi.jpg",
        },
        {
            name: "Hummer",
            logo: "/Images/hummer-logo.png",
            backgroundImage: "/Images/hummer.jpg",
        },
        {
            name: "Kia",
            logo: "/Images/kia-logo.png",
            backgroundImage: "/Images/kia.jpg",
        },
        {
            name: "McLaren",
            logo: "/Images/mclaren-logo.png",
            backgroundImage: "/Images/mclaren.jpg",
        },
    ]

    return (
        <section className="py-12 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <p className="text-gray-600 mb-2">Explora nuestra flota premium</p>
                    <h2 className="text-3xl font-bold">Las mejores marcas de coches disponibles para ti</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {brands.map((brand) => (
                        <div
                            key={brand.name}
                            className="relative h-[300px] rounded-lg overflow-hidden group cursor-pointer"
                        >
                            <img
                                src={brand.backgroundImage}
                                alt={`${brand.name} car`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500 group-hover:bg-opacity-40" />
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    className="w-32 h-auto filter brightness-0 invert"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

