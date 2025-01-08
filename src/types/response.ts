import Car from "@/Interfaces/ICar";

export type ResponseType = {
    cars:Car[];
    loading:boolean;
    error:string;
}