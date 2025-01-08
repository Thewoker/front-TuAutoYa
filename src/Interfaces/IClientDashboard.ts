export interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  city: string | null;
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
  approvalStatus: string;
  users: User;
}

export interface Order {
  id: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  startDate: string;
  endDate: string;
  price: string;
  subtotal: string;
  cars: Car;
}

export interface ApiResponse {
  user: User;
  orders: Order[];
}

