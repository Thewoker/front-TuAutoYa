export interface IUser {
    id: string;
    name: string;
    email: string;
    identity: number;
    phone: string;
    city: string;
    role: string;
}

export interface ICar {
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

export interface IOrderDetails {
    id: string;
    startDate: string;
    endDate: string;
    price: string;
    subtotal: string;
    cars: ICar;
}

export interface IOrder {
    id: string;
    orderDate: string;
    orderDetails: IOrderDetails;
    users: IUser;
}
