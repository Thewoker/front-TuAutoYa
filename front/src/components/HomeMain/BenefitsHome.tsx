import { DollarSign, Coins, Globe2, HeadphonesIcon } from 'lucide-react'

interface BenefitCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mb-4">
                <div className="text-amber-600">
                    {icon}
                </div>
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    )
}

export function BenefitsSection() {
    const benefits = [
        {
            icon: <DollarSign className="w-6 h-6" />,
            title: "Mejores precios y descuentos",
            description: "Accede a las mejores ofertas de las principales compañías de alquiler de coches, disfruta de descuentos y recibe ofertas exclusivas."
        },
        {
            icon: <Coins className="w-6 h-6" />,
            title: "Reservas con cashback",
            description: "Haz tu reserva y obtén hasta un 10% de cashback en tu billetera digital para tu próximo alquiler."
        },
        {
            icon: <Globe2 className="w-6 h-6" />,
            title: "Estamos en todo el mundo",
            description: "Compara las mejores opciones de más de 300 empresas de alquiler de coches en 7,000 ciudades y 20,000 puntos de servicio."
        },
        {
            icon: <HeadphonesIcon className="w-6 h-6" />,
            title: "Excelencia en atención al cliente",
            description: "Obtén la ayuda que necesites con nuestro equipo de soporte especializado, disponible los 7 días de la semana."
        }
    ]

    return (
        <section className="py-12 px-4">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                    Beneficios de alquilar con TuAutoYa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

