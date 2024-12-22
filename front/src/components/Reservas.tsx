'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from 'date-fns'
import Image from 'next/image'

interface IUser {
  id: string;
  name: string;
  email: string;
  identity: number;
  phone: string;
  city: string;
  role: string;
}

interface ICar {
  id: string;
  brand: string;
  model: string;
  year: string;
  pricePerDay: number;
  image: string;
  description: string;
  transmission: string;
  fuelType: string;
  kilometer: string;
  brakes: string;
  rating: number;
  status: string;
  users: IUser;
}

interface IOrderDetails {
  id: string;
  startDate: string;
  endDate: string;
  price: string;
  subtotal: string;
  cars: ICar;
}

interface IOrder {
  id: string;
  orderDate: string;
  orderDetails: IOrderDetails;
  users: IUser;
}

export function Reservas() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    orderId: '',
    startDate: '',
    endDate: '',
    carBrand: '',
    carModel: '',
    userName: '',
    userEmail: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredOrders = orders.filter(order => {
    const customerName = order.users.name.toLowerCase();
    const ownerName = order.orderDetails.cars.users.name.toLowerCase();
    const searchName = filters.userName.toLowerCase();
    const customerEmail = order.users.email.toLowerCase();
    const ownerEmail = order.orderDetails.cars.users.email.toLowerCase();
    const searchEmail = filters.userEmail.toLowerCase();

    return (
      (filters.orderId === '' || order.id.includes(filters.orderId)) &&
      (filters.startDate === '' || order.orderDetails.startDate >= filters.startDate) &&
      (filters.endDate === '' || order.orderDetails.endDate <= filters.endDate) &&
      (filters.carBrand === '' || order.orderDetails.cars.brand.toLowerCase().includes(filters.carBrand.toLowerCase())) &&
      (filters.carModel === '' || order.orderDetails.cars.model.toLowerCase().includes(filters.carModel.toLowerCase())) &&
      (filters.userName === '' || customerName.includes(searchName) || ownerName.includes(searchName)) &&
      (filters.userEmail === '' || customerEmail.includes(searchEmail) || ownerEmail.includes(searchEmail))
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Reservas</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <div>
              <Label htmlFor="userName">Nombre Cliente/Propietario</Label>
              <Input
                id="userName"
                value={filters.userName}
                onChange={(e) => handleFilterChange('userName', e.target.value)}
                placeholder="Buscar por nombre"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Email Cliente/Propietario</Label>
              <Input
                id="userEmail"
                value={filters.userEmail}
                onChange={(e) => handleFilterChange('userEmail', e.target.value)}
                placeholder="Buscar por email"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredOrders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Orden #{order.id}</span>
              <Badge>{order.users.role === 'customer' ? 'Cliente' : 'Propietario'}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Detalles de la Orden</h3>
                  <p><span className="font-semibold">Fecha de Orden:</span> {format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm')}</p>
                  <p><span className="font-semibold">Fecha de Inicio:</span> {format(new Date(order.orderDetails.startDate), 'dd/MM/yyyy HH:mm')}</p>
                  <p><span className="font-semibold">Fecha de Fin:</span> {format(new Date(order.orderDetails.endDate), 'dd/MM/yyyy HH:mm')}</p>
                  <p><span className="font-semibold">Precio por Día:</span> ${order.orderDetails.price}</p>
                  <p><span className="font-semibold">Subtotal:</span> ${order.orderDetails.subtotal}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Detalles del Cliente</h3>
                  <p><span className="font-semibold">Nombre:</span> {order.users.name}</p>
                  <p><span className="font-semibold">Email:</span> {order.users.email}</p>
                  <p><span className="font-semibold">Ciudad:</span> {order.users.city}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Detalles del Veh��culo</h3>
                  <div className="relative h-40 w-full mb-2">
                    <Image
                      src={order.orderDetails.cars.image}
                      alt={`${order.orderDetails.cars.brand} ${order.orderDetails.cars.model}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <p><span className="font-semibold">Marca:</span> {order.orderDetails.cars.brand}</p>
                  <p><span className="font-semibold">Modelo:</span> {order.orderDetails.cars.model}</p>
                  <p><span className="font-semibold">Año:</span> {order.orderDetails.cars.year}</p>
                  <p><span className="font-semibold">Transmisión:</span> {order.orderDetails.cars.transmission}</p>
                  <p><span className="font-semibold">Combustible:</span> {order.orderDetails.cars.fuelType}</p>
                  <p><span className="font-semibold">Kilometraje:</span> {order.orderDetails.cars.kilometer}</p>
                  <p><span className="font-semibold">Calificación:</span> {order.orderDetails.cars.rating}/5</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Detalles del Propietario</h3>
                  <p><span className="font-semibold">Nombre:</span> {order.orderDetails.cars.users.name}</p>
                  <p><span className="font-semibold">Email:</span> {order.orderDetails.cars.users.email}</p>
                  <p><span className="font-semibold">Ciudad:</span> {order.orderDetails.cars.users.city}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

