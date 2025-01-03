import Car from "@/Interfaces/ICar";
import { useEffect, useState } from "react";

export function getCars(){
    const url =`${process.env.NEXT_PUBLIC_API_URL}/cars`
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
            const fetchCars = async () => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    setCars(data);
                } catch (error:any) {
                    console.error('Error fetching cars:', error);
                    setError(error)
                } finally {
                    setLoading(false);
                }
            };
    
            fetchCars();
        }, [url]);

        return { cars, loading, error}
}