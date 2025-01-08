"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Order, ApiResponse } from '@/Interfaces/IClientDashboard'
import PastReservations from '@/components/dashboard/Cliente/PastReservations'
import { useToast } from "@/hooks/use-toast"
import { isBefore } from 'date-fns'

function PasadasView() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get("/api/getUserData")
                const user = await JSON.parse(data)
                const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user.id}`);
                console.log(response.data.orders)
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast({
                    title: "Error",
                    description: "No se pudieron cargar las reservas. Por favor, intente de nuevo.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [toast]);

    const pastOrders = orders.filter((order) => isBefore(new Date(order.startDate), new Date()));
    
    if (loading) {
        return <div>Cargando reservas pasadas...</div>;
    }

    return <PastReservations rentals={pastOrders} />
}

export default PasadasView

