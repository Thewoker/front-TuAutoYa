import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Car, DollarSign, Calendar, Shield } from 'lucide-react'

const BeAProviderPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-emerald-900">Sé un Proveedor con TuAutoYa</h1>
      
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-xl text-gray-700 mb-6">
          ¿Tienes un auto que no usas todo el tiempo? ¡Conviértelo en una fuente de ingresos extra!
          Únete a nuestra red de proveedores y comienza a ganar dinero hoy mismo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-8 h-8 text-emerald-600 mr-3" />
              <h3 className="text-2xl font-semibold">Ganancias Extras</h3>
            </div>
            <p className="text-gray-700">Genera ingresos adicionales al alquilar tu vehículo cuando no lo estés utilizando.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-emerald-600 mr-3" />
              <h3 className="text-2xl font-semibold">Flexibilidad Total</h3>
            </div>
            <p className="text-gray-700">Tú decides cuándo y por cuánto tiempo quieres alquilar tu auto. Mantén el control total.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-emerald-600 mr-3" />
              <h3 className="text-2xl font-semibold">Seguridad Garantizada</h3>
            </div>
            <p className="text-gray-700">Ofrecemos seguros completos y verificamos a todos los conductores para tu tranquilidad.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Car className="w-8 h-8 text-emerald-600 mr-3" />
              <h3 className="text-2xl font-semibold">Mantenimiento Incluido</h3>
            </div>
            <p className="text-gray-700">Nos encargamos del mantenimiento de tu vehículo, manteniéndolo en óptimas condiciones.</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-emerald-100 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-emerald-900 mb-4">¿Listo para comenzar?</h2>
        <p className="text-xl text-gray-700 mb-6">
          Contáctanos hoy mismo y descubre cómo puedes convertirte en un proveedor de TuAutoYa.
        </p>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Email:</span> <a href="mailto:proveedores@tuautoya.com" className="text-emerald-700 hover:underline">proveedores@tuautoya.com</a>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Teléfono:</span> <a href="tel:+5493624725787" className="text-emerald-700 hover:underline">+54 9 362 472-5787</a>
          </p>
        </div>
        <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white" size="lg">
          Quiero ser Proveedor
        </Button>
      </div>
    </div>
  )
}

export default BeAProviderPage

