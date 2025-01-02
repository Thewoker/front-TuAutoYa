export interface Rental {
    id: string;
    carId: string;
    model: string;
    brand: string;
    price: number;
    image: string;
    status: 'upcoming' | 'past';
    dateStart: Date;
    dateEnd: Date;
    total: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    location: string;
}
// src/Interfaces/IClientDashboard.ts


  