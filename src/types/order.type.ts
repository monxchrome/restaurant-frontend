export interface IOrderItem {
    id: number;
    menuItemId: number;
    quantity: number;
    price: number;
}

export interface IOrder {
    id: number;
    clientName: string;
    clientSurname: string;
    clientPhone: string;
    deliveryAddress?: string;
    waiterId?: number | null;
    status: string;
    totalPrice: number;
    items: IOrderItem[];
    createdAt?: string;
    updatedAt?: string;
}