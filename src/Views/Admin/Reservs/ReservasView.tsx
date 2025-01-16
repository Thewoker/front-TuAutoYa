'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IOrder } from '@/Interfaces/IReservs'
import Filter from '@/components/Admin/Reservs/Filter'
import ReservedCardCard from '@/components/Admin/Reservs/ReservedCardCard'
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<IOrder[]>(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const cancelOrder = async (orderId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/cancel`);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
      toast({
        title: "Success",
        description: "Order cancelled successfully",
      })
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast({
        title: "Error",
        description: "Failed to cancel order. Please try again.",
        variant: "destructive",
      })
    }
  };

  const filteredOrders = orders.filter(order => {
    const customerName = order?.users?.name?.toLowerCase() ?? '';
    const ownerName = order?.cars?.users?.name?.toLowerCase() ?? '';
    const searchName = filters?.userName.toLowerCase();
    const customerEmail = order?.users?.email.toLowerCase();
    const ownerEmail = order?.cars?.users.email.toLowerCase();
    const searchEmail = filters.userEmail.toLowerCase();

    return (
      (filters?.orderId === '' || order?.id.includes(filters.orderId)) &&
      (filters?.startDate === '' || order?.startDate >= filters.startDate) &&
      (filters?.endDate === '' || order?.endDate <= filters.endDate) &&
      (filters?.carBrand === '' || order?.cars?.brand?.toLowerCase().includes(filters.carBrand.toLowerCase())) &&
      (filters?.carModel === '' || order?.cars?.model?.toLowerCase().includes(filters.carModel.toLowerCase())) &&
      (filters?.userName === '' || customerName.includes(searchName) || ownerName.includes(searchName)) &&
      (filters?.userEmail === '' || customerEmail?.includes(searchEmail) || ownerEmail?.includes(searchEmail))
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
          <ReservedCardCard order={order} onCancelOrder={cancelOrder} />
        </Card>
      ))}
    </div>
  )
}

export default ReservasView

