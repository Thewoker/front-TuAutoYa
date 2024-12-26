'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from 'date-fns'

interface IOrders {
  id: string;
  orderDate: Date;
  totalAmount: number;
  status: number;
  userId: number;
}

interface IOrdersDetails {
  id: number;
  startDate: Date;
  endDate: Date;
  dailyPrice: number;
  subtotal: number;
  orderId: number;
  carId: number;
}

interface ICars {
  id: number;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  status: string;
  img: string;
  description: string;
  transmission: string;
  mileage: string;
  brakes: string;
  fuelType: string;
  rating: number;
  userId: number;
}

// Mock data
const mockOrders: IOrders[] = [
  { id: '1', orderDate: new Date('2025-07-01'), totalAmount: 500, status: 1, userId: 101 },
  { id: '2', orderDate: new Date('2025-07-05'), totalAmount: 750, status: 2, userId: 102 },
  { id: '3', orderDate: new Date('2025-07-10'), totalAmount: 600, status: 3, userId: 103 },
]

const mockOrderDetails: IOrdersDetails[] = [
  { id: 1, startDate: new Date('2025-07-01'), endDate: new Date('2025-07-05'), dailyPrice: 100, subtotal: 400, orderId: 1, carId: 201 },
  { id: 2, startDate: new Date('2025-07-05'), endDate: new Date('2025-07-10'), dailyPrice: 150, subtotal: 750, orderId: 2, carId: 202 },
  { id: 3, startDate: new Date('2025-07-10'), endDate: new Date('2025-07-13'), dailyPrice: 120, subtotal: 360, orderId: 3, carId: 203 },
]

const mockCars: ICars[] = [
  {
    id: 201,
    brand: "Tesla",
    model: "Model 3",
    year: 2025,
    pricePerDay: 100,
    status: "Available",
    img: "https://www.bing.com/th?id=OIP.VrfiI56CbK-DVqaLP9iDMgHaE6&w=312&h=200&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    description: "Vehículo eléctrico de alta gama",
    transmission: "Automatic",
    mileage: "5000 km",
    brakes: "Regenerative",
    fuelType: "Electric",
    rating: 4.8,
    userId: 1001
  },
  {
    id: 202,
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    pricePerDay: 80,
    status: "Available",
    img: "https://www.motortrend.com/uploads/sites/5/2013/09/2014-Toyota-Corolla-S-front-three-quarter-in-motion2.jpg",
    description: "Sedán confiable y eficiente",
    transmission: "Automatic",
    mileage: "15000 km",
    brakes: "Disc",
    fuelType: "Gasoline",
    rating: 4.5,
    userId: 1002
  },
  {
    id: 203,
    brand: "Ford",
    model: "Mustang",
    year: 2025,
    pricePerDay: 150,
    status: "Available",
    img: "https://images.squarespace-cdn.com/content/v1/5acced225b409b3ac7b67b84/1600793892719-5N1736YU88MX9H1O1Z5T/ke17ZwdGBToddI8pDm48kFyD7pzB8zoMIVY5aiUuFlp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0jG2lbcDYBOeMi4OFSYem8DMb5PTLoEDdB05UqhYu-xbnSznFxIRsaAU-3g5IaylIg/DSC_3362.jpg",
    description: "Muscle car icónico",
    transmission: "Manual",
    mileage: "3000 km",
    brakes: "Performance",
    fuelType: "Gasoline",
    rating: 4.7,
    userId: 1003
  }
]

const getStatusBadge = (status: number) => {
  switch (status) {
    case 1:
      return <Badge variant="secondary">Pendiente</Badge>
    case 2:
      return <Badge variant="default">Confirmada</Badge>
    case 3:
      return <Badge variant="destructive">Cancelada</Badge>
    default:
      return <Badge>Desconocido</Badge>
  }
}

export function Reservas() {
  const [filters, setFilters] = useState({
    orderId: '',
    userId: '',
    status: '',
    startDate: '',
    endDate: '',
    carBrand: '',
    carModel: '',
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredOrders = mockOrders.filter(order => {
    const orderDetails = mockOrderDetails.find(detail => detail.orderId === Number(order.id))
    const car = orderDetails ? mockCars.find(car => car.id === orderDetails.carId) : null

    return (
      (filters.orderId === '' || order.id.includes(filters.orderId)) &&
      (filters.userId === '' || order.userId.toString().includes(filters.userId)) &&
      (filters.status === 'all' || filters.status === '' || order.status.toString() === filters.status) &&
      (filters.startDate === '' || (orderDetails && format(orderDetails.startDate, 'yyyy-MM-dd') >= filters.startDate)) &&
      (filters.endDate === '' || (orderDetails && format(orderDetails.endDate, 'yyyy-MM-dd') <= filters.endDate)) &&
      (filters.carBrand === '' || (car && car.brand.toLowerCase().includes(filters.carBrand.toLowerCase()))) &&
      (filters.carModel === '' || (car && car.model.toLowerCase().includes(filters.carModel.toLowerCase())))
    )
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Reservas</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="orderId">ID de Orden</Label>
              <Input
                id="orderId"
                value={filters.orderId}
                onChange={(e) => handleFilterChange('orderId', e.target.value)}
                placeholder="Buscar por ID de Orden"
              />
            </div>
            <div>
              <Label htmlFor="userId">ID de Usuario</Label>
              <Input
                id="userId"
                value={filters.userId}
                onChange={(e) => handleFilterChange('userId', e.target.value)}
                placeholder="Buscar por ID de Usuario"
              />
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="1">Pendiente</SelectItem>
                  <SelectItem value="2">Confirmada</SelectItem>
                  <SelectItem value="3">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Fecha de Inicio</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Fecha de Fin</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="carBrand">Marca del Vehículo</Label>
              <Input
                id="carBrand"
                value={filters.carBrand}
                onChange={(e) => handleFilterChange('carBrand', e.target.value)}
                placeholder="Buscar por marca"
              />
            </div>
            <div>
              <Label htmlFor="carModel">Modelo del Vehículo</Label>
              <Input
                id="carModel"
                value={filters.carModel}
                onChange={(e) => handleFilterChange('carModel', e.target.value)}
                placeholder="Buscar por modelo"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredOrders.map((order) => {
        const orderDetails = mockOrderDetails.find(detail => detail.orderId === Number(order.id))
        const car = orderDetails ? mockCars.find(car => car.id === orderDetails.carId) : null
        return (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Orden #{order.id}</span>
                {getStatusBadge(order.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Detalles de la Orden</h3>
                    <p><span className="font-semibold">Fecha de Orden:</span> {format(order.orderDate, 'dd/MM/yyyy')}</p>
                    <p><span className="font-semibold">Monto Total:</span> ${order.totalAmount}</p>
                    <p><span className="font-semibold">ID de Usuario:</span> {order.userId}</p>
                  </div>
                  {orderDetails && (
                    <div>
                      <h3 className="font-semibold text-lg">Detalles de la Reserva</h3>
                      <p><span className="font-semibold">Fecha de Inicio:</span> {format(orderDetails.startDate, 'dd/MM/yyyy')}</p>
                      <p><span className="font-semibold">Fecha de Fin:</span> {format(orderDetails.endDate, 'dd/MM/yyyy')}</p>
                      <p><span className="font-semibold">Precio Diario:</span> ${orderDetails.dailyPrice}</p>
                      <p><span className="font-semibold">Subtotal:</span> ${orderDetails.subtotal}</p>
                    </div>
                  )}
                </div>
                {car && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">Detalles del Vehículo</h3>
                      <img src={car.img} alt={`${car.brand} ${car.model}`} className="w-full h-40 object-cover rounded-md mb-2" />
                      <p><span className="font-semibold">Marca:</span> {car.brand}</p>
                      <p><span className="font-semibold">Modelo:</span> {car.model}</p>
                      <p><span className="font-semibold">Año:</span> {car.year}</p>
                      <p><span className="font-semibold">Precio por Día:</span> ${car.pricePerDay}</p>
                      <p><span className="font-semibold">Descripción:</span> {car.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Especificaciones</h3>
                      <p><span className="font-semibold">Transmisión:</span> {car.transmission}</p>
                      <p><span className="font-semibold">Kilometraje:</span> {car.mileage}</p>
                      <p><span className="font-semibold">Frenos:</span> {car.brakes}</p>
                      <p><span className="font-semibold">Tipo de Combustible:</span> {car.fuelType}</p>
                      <p><span className="font-semibold">Calificación:</span> {car.rating}/5</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
