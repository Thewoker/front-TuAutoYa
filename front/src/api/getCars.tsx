import Car from "@/Interfaces/ICar";
import { useEffect, useState } from "react";

export function useGetCars(){
    const url =`${process.env.NEXT_PUBLIC_API_URL}/cars`
    console.log("linkurl", url )
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
            const fetchCars = async () => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    setCars(data);
                } catch (error) {
                    console.error('Error fetching cars:', error);
                    setError("")
                } finally {
                    setLoading(false);
                }
            };
    
            fetchCars();
        }, [url]);

        return { cars, loading, error}
}