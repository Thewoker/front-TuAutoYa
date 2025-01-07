"use client"
import React, { useEffect, useState } from 'react'
import { Rental } from '@/Interfaces/IClientDashboard'
import UpcomingReservations from '@/components/dashboard/Cliente/UpcomingReservations';

function Pendientes() {
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

    const pastRentals = rentals.filter((rental) => rental.status === "active");
    
    return <UpcomingReservations rentals={pastRentals} />
}

export default Pendientes