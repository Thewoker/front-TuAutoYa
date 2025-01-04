export interface User {
    id: string;
    name: string;
    email: string;
    identity: number;
    phone: string;
    city: string;
    role: string;
    cars: Car[] | null;
  }
  
  export interface Car {
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
    users: User;
  }
  
  export interface Rental {
    id: string;
    orderDate: string;
    status: string;
    users: User;
  }
  
  