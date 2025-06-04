import { apiService } from '@/lib/apiService';
import { urls } from '@/lib/config';

export interface OrderItem {
    id: number;
    menuItemId: number;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    clientName: string;
    clientSurname: string;
    clientPhone: string;
    deliveryAddress?: string;
    waiterId?: number | null;
    status: string;
    totalPrice: number;
    items: OrderItem[];
    createdAt?: string;
    updatedAt?: string;
}


interface OrdersResponse {
    orders: Order[];
    total: number;
    page: number;
    pageSize: number;
}

const orderService = {
    getAll: (page: number, pageSize: number = 10) =>
        apiService
            .get(`${urls.orders.getAll}?page=${page}&pageSize=${pageSize}`)
            .then(res => res.data as OrdersResponse),

    updateOrder: (orderId: number, data: Partial<Order>) =>
        apiService.patch(`${urls.orders.updateOrder(orderId)}`, data),

    updateOrderStatus: (orderId: number, data: Partial<Order>) =>
        apiService.patch(`${urls.orders.updateOrderStatus(orderId)}`, data),

    deleteOrder: (orderId: number) =>
        apiService.delete(`${urls.orders.deleteOrder(orderId)}`),
};

export { orderService };
