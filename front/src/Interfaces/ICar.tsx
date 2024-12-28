interface Car {
    id: string;
    brand: string;
    model: string;
    year: string;
    pricePerDay: string;
    image: string;
    description: string;
    transmission: string;
    fuelType: string;
    kilometer: string;
    brakes: string;
    insurance: string;
    rating: number;
    status: string;
    users: {
        id: string;
        firebaseUid: string;
        name: string;
        email: string;
        identity: string | null;
        phone: string | null;
        city: string;
        role: string;
    };
}

export default Car;