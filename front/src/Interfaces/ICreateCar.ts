export interface User {
    id: string
    name: string | null
    email: string
    identity: number | null
    phone: string | null
    city: string | null
    role: string
}

export interface Car {
    id: string
    brand: string
    model: string
    year: string
    pricePerDay: number
    image: string
    description: string
    transmission: string
    fuelType: string
    kilometer: string
    brakes: string
    rating: number
    status: string
    users: User
}

// Exports from CarCards
export interface CarCard {
    id: string
    brand: string
    model: string
    year: string
    pricePerDay: number
    image: string
    description: string
    transmission: string
    fuelType: string
    kilometer: string
    brakes: string
    rating: number
    status: string
    users: User
}

export interface CarCardProps {
    car: Car
    onDelete: () => void
}


// AddCarForm
export interface CarFormData {
    brand: string
    model: string
    year: string
    pricePerDay: number
    image: string
    description: string
    transmission: string
    fuelType: string
    kilometer: string
    brakes: string
    rating: number
    status: string
}

export interface CloudinaryResult {
    info: {
        secure_url: string;
    };
}

export interface AddCarFormProps {
    onSubmit: (data: CarFormData) => void
    userData: User
}