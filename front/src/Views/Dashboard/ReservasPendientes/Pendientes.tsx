"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Order, ApiResponse } from '@/Interfaces/IClientDashboard'
import UpcomingReservations from '@/components/dashboard/Cliente/UpcomingReservations'
import { useToast } from "@/hooks/use-toast"
import { isAfter } from 'date-fns'

function Pendientes() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get("/api/getUserData")
                const user = await JSON.parse(data)
                const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user.id}`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast({
                    title: "Error",
                    description: "No se pudieron cargar las reservas pendientes. Por favor, intente de nuevo.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [toast]);

    const pendingOrders = orders?.filter((order) => isAfter(new Date(order.startDate), new Date()));
    
    if (loading) {
        return <div>Cargando reservas pendientes...</div>;
    }

    return <UpcomingReservations rentals={pendingOrders} />
}

export default Pendientes

