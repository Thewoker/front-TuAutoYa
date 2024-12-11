'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const faqItems = [
    {
        question: "¿Cuáles son los requisitos mínimos para alquilar un coche?",
        answer: "Los requisitos mínimos incluyen: ser mayor de 21 años, tener una licencia de conducir válida con al menos 1 año de antigüedad, y una tarjeta de crédito a nombre del conductor."
    },
    {
        question: "¿Cómo funciona el depósito de garantía al alquilar un coche?",
        answer: "El depósito de garantía es un bloqueo temporal en tu tarjeta de crédito que se libera al devolver el vehículo en las mismas condiciones. El monto varía según el tipo de vehículo."
    },
    {
        question: "¿Qué está incluido en el alquiler de coches?",
        answer: "El alquiler incluye seguro básico, kilometraje ilimitado, mantenimiento del vehículo, y asistencia en carretera 24/7."
    },
    {
        question: "¿Cómo funcionan las coberturas en el alquiler de coches?",
        answer: "Ofrecemos diferentes niveles de cobertura, desde básica hasta premium, que pueden incluir protección contra daños, robo, y responsabilidad civil."
    },
    {
        question: "¿Qué es y cómo usar un código de descuento?",
        answer: "Los códigos de descuento son promociones especiales que puedes aplicar durante la reserva para obtener precios reducidos. Simplemente ingresa el código en el campo correspondiente al realizar tu reserva."
    },
    {
        question: "¿Qué es la tarifa de alquiler de coches de un solo sentido (One-Way)?",
        answer: "La tarifa One-Way se aplica cuando recoges el vehículo en una ubicación y lo devuelves en otra diferente. Puede incluir un cargo adicional según la distancia."
    },
    {
        question: "¿Cómo comparo precios de alquiler de coches en Rentcars?",
        answer: "Puedes comparar precios utilizando nuestro buscador, que muestra todas las opciones disponibles según tus fechas y preferencias, permitiéndote filtrar por precio, tipo de vehículo y más."
    }
]

export function FaqSection() {
    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Preguntas frecuentes sobre el alquiler de coches
                </h2>
                <Link
                    href="/todas-las-preguntas"
                    className="text-blue-600 hover:underline text-sm"
                >
                    Ver todas las preguntas
                </Link>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border rounded-lg px-4"
                    >
                        <AccordionTrigger className="text-left">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

