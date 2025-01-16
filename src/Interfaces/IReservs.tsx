export interface IUser {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  identity: number | null;
  phone: string | null;
  city: string | null;
  address: string | null;
  role: string;
  isEnabled: boolean;
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
  approvalStatus: string;
  discount: number;
  isDiscount: boolean;
  users: IUser;
}

export interface IOrder {
  id: string;
  orderDate: string;
  status: 'active' | 'completed' | 'cancelled';
  paymentStatus: string;
  startDate: string;
  endDate: string;
  price: string;
  subtotal: string;
  cars: ICar | null;
}

// Filters types
export interface Filters {
  orderId: string;
  startDate: string;
  endDate: string;
  carBrand: string;
  carModel: string;
  userName: string;
  userEmail: string;
}

export interface FilterProps {
  filters: Filters;
  handleFilterChange: (key: string, value: string) => void;
}

export interface OrderProps {
  order: IOrder;
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
  status: 'active' | 'completed' | 'cancelled';
  orderDetails: IOrderDetails;
  users: IUser;
}


//Filters types
export interface Filters {
  orderId: string;
  startDate: string;
  endDate: string;
  carBrand: string;
  carModel: string;
  userName: string;
  userEmail: string;
}


export interface FilterProps {
  filters: Filters;
  handleFilterChange: (key: string, value: string) => void;
}

export interface OrderProps {
  order: IOrder;
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
  approvalStatus: string;
  users: IUser;
}


// Filters types
export interface Filters {
  orderId: string;
  startDate: string;
  endDate: string;
  carBrand: string;
  carModel: string;
  userName: string;
  userEmail: string;
}

export interface FilterProps {
  filters: Filters;
  handleFilterChange: (key: string, value: string) => void;
}

export interface OrderProps {
  order: IOrder;
}

