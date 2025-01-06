'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import OwnerDashboard from '@/components/dashboard/Proveedor/OwnerDashboard'
import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import { Rental } from '@/Interfaces/IClientDashboard'
import PastReservations from '@/components/dashboard/Cliente/PastReservations'
import UpcomingReservations from '@/components/dashboard/Cliente/UpcomingReservations'

export default function Dashboard() {
    const [role, setRole] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState('reservations-pend')
    const router = useRouter()
    const [rentals, setRentals] = useState<Rental[]>([]);

    useEffect(() => {
        const fetchRentals = async () => {
            // En una aplicación real, esto sería una llamada a la API
            const mockRentals: Rental[] = [
                {
                    "id": "order-uuid-1",
                    "orderDate": "2025-01-04T15:30:00.000Z",
                    "status": "active",
                    "users": {
                        "id": "user-uuid-1",
                        "name": "John Doe",
                        "email": "john.doe@example.com",
                        "identity": 123456,
                        "phone": "123-456-7890",
                        "city": "Resistencia",
                        "role": "CUSTOMER",
                        "cars": [
                            {
                                "id": "car-uuid-1",
                                "brand": "Toyota",
                                "model": "Corolla",
                                "year": "2020",
                                "pricePerDay": 50,
                                "image": "car1.png",
                                "description": "A reliable car",
                                "transmission": "AUTOMATIC",
                                "fuelType": "PETROL",
                                "kilometer": "15000",
                                "brakes": "ABS",
                                "rating": 4.5,
                                "status": "Active",
                                "users": {
                                    "id": "user-uuid-1",
                                    "name": "John Doe",
                                    "email": "john.doe@example.com",
                                    "identity": 123456,
                                    "phone": "123-456-7890",
                                    "city": "Resistencia",
                                    "role": "CUSTOMER",
                                    "cars": null
                                }
                            }
                        ]
                    }
                },
                {
                    "id": "order-uuid-1",
                    "orderDate": "2025-01-04T15:30:00.000Z",
                    "status": "completed",
                    "users": {
                        "id": "user-uuid-1",
                        "name": "John Doe",
                        "email": "john.doe@example.com",
                        "identity": 123456,
                        "phone": "123-456-7890",
                        "city": "Resistencia",
                        "role": "CUSTOMER",
                        "cars": [
                            {
                                "id": "car-uuid-1",
                                "brand": "Toyota",
                                "model": "Corolla",
                                "year": "2020",
                                "pricePerDay": 50,
                                "image": "car1.png",
                                "description": "A reliable car",
                                "transmission": "AUTOMATIC",
                                "fuelType": "PETROL",
                                "kilometer": "15000",
                                "brakes": "ABS",
                                "rating": 4.5,
                                "status": "Active",
                                "users": {
                                    "id": "user-uuid-1",
                                    "name": "John Doe",
                                    "email": "john.doe@example.com",
                                    "identity": 123456,
                                    "phone": "123-456-7890",
                                    "city": "Resistencia",
                                    "role": "CUSTOMER",
                                    "cars": null
                                }
                            }
                        ]
                    }
                }
            ];
            setRentals(mockRentals);
        };

        fetchRentals();
    }, []);

    const upcomingRentals = rentals.filter((rental) => rental.status === "active");
    const pastRentals = rentals.filter((rental) => rental.status !== "active");


    useEffect(() => {
        const getRole = async () => {
            try {
                const { data } = await axios.get("/api/getUserData")
                const user = JSON.parse(data)

                if (user) {
                    setRole(user.role)
                } else {
                    router.push('/Login')
                }
            } catch (error) {
                console.error("Se ha producido un error: ", error)
                router.push('/Login')
            }
        }

        getRole()
    }, [router]);

    const renderComponent = () => {
        switch (activeTab) {
            case 'reservations-past':
                return <PastReservations rentals={pastRentals} />
                break;
            case 'reservations-pend':
                return <UpcomingReservations rentals={upcomingRentals} />
                break;
            case 'supplier':
                return <OwnerDashboard /> 
                break;
            case 'join_us':
                return <>Unete como proveedor</>
                break;
            case 'payments':
                return <>Pagos</>
            case 'profile':
                return <>Perfil</>
            default:
                return <>Vista no disponible</>
                break;
        }
    }

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }

    if (!role) {
        return <div>Cargando...</div>
    }

    return (
        <div className="flex bg-gray-100">
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} role={role} />
            <main className="min-h-screen w-full bg-white">
                <Navbar onTabChange={handleTabChange} />
                {renderComponent()}
            </main>
        </div>
    )
}

