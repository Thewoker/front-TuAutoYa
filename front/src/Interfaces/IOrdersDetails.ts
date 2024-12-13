interface IOrdersDetails{
    id: number;
    startDate: Date;
    endDate: Date;
    dailyPrice: number;
    subtotal: number;
    orderId: number;
    carId: number;
};

export default IOrdersDetails;