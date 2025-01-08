const data = [
    // Roles
    {
      roles: [
        { id: 1, name: 'admin' },
        { id: 2, name: 'owner' },
        { id: 3, name: 'customer' }
      ]
    },
    
    // Users
    {
      users: [
        { id: 1, name: 'Admin Central', email: 'admin@rental.com', password: 'admin123', roleId: 1 },
        { id: 2, name: 'AutoRent S.A.', email: 'autorent@empresa.com', password: 'empresa123', roleId: 2 },
        { id: 3, name: 'Carlos Pérez', email: 'carlos.perez@gmail.com', password: 'cliente123', roleId: 3 },
        { id: 4, name: 'Lucía Fernández', email: 'lucia.fernandez@gmail.com', password: 'cliente456', roleId: 3 },
        { id: 5, name: 'Vehículos del Sur', email: 'vehiculos.sur@empresa.com', password: 'sur123', roleId: 2 }
      ]
    },
    
    // Orders
    {
      orders: [
        { id: 1, orderDate: '2024-12-10', totalAmount: 20000, status: 'Completed', userId: 3 },
        { id: 2, orderDate: '2024-12-11', totalAmount: 8500, status: 'Pending', userId: 4 }
      ]
    },
    
    // Order Details
    {
      orderDetails: [
        { id: 1, startDate: '2024-12-10', endDate: '2024-12-12', dailyPrice: 10000, subtotal: 20000, orderId: 1, carId: 1 },
        { id: 2, startDate: '2024-12-11', endDate: '2024-12-11', dailyPrice: 8500, subtotal: 8500, orderId: 2, carId: 2 }
      ]
    },
    
    // Cars
    {
      cars: [
        { id: 1, brand: 'Toyota', model: 'Corolla', year: 2022, pricePerDay: 10000, status: 'Available', img: '/images/hummer.jpg?height=200&width=300', description: 'Toyota Corolla 2022, en perfectas condiciones',transmission: "Automatic",
            mileage: "45000 Kms",
            brakes: "ABS Brakes",
            fuelType: "Electric",
            rating: 4.7, userId: 2 },
        { id: 2, brand: 'Chevrolet', model: 'Onix', year: 2021, pricePerDay: 8500, status: 'Rented', img: '/images/audi.jpg?height=200&width=300', description: 'Chevrolet Onix 2021, compacto y económico',transmission: "Automatic",
            mileage: "30000 Kms",
            brakes: "ABS Brakes",
            fuelType: "Petrol",
            rating: 4.8, userId: 2 },
        { id: 3, brand: 'Renault', model: 'Sandero', year: 2023, pricePerDay: 9500, status: 'Available', img: '/images/kia.jpg?height=200&width=300', description: 'Renault Sandero 2023, ideal para familias',transmission: "Automatic",
            mileage: "25000 Kms",
            brakes: "ABS Brakes",
            fuelType: "Diesel",
            rating: 4.9, userId: 5 },
        { id: 4, brand: 'Volkswagen', model: 'Golf', year: 2020, pricePerDay: 12000, status: 'Available', img: '/images/mclaren.jpg?height=200&width=300', description: 'Volkswagen Golf 2020, con gran performance',transmission: "Automatic",
            mileage: "25000 Kms",
            brakes: "ABS Brakes",
            fuelType: "Diesel",
            rating: 4.9, userId: 5 }
      ]
    }
  ];
  
  export default data;