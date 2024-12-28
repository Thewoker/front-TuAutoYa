'use client'

import React, { useState, useEffect } from 'react'
import { IOrder } from '@/Interfaces/IReservs'
import Filter from '@/components/Admin/Reservs/Filter'
import ReservedCardCard from '@/components/Admin/Reservs/ReservedCardCard'
import { Card } from "@/components/ui/card"


function ReservasView() {
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
      <Filter filters={filters} handleFilterChange={handleFilterChange}/>

      {filteredOrders.map((order) => (
        <Card key={order.id} className='bg-[#f59e0b]'>
          <ReservedCardCard order={order}/>
        </Card>
      ))}
    </div>
  )
}

export default ReservasView