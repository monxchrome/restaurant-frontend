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

const orderService = {
    getAll: (
        page: number,
        pageSize: number,
        status?: string,
        sortBy: string = "createdAt",
        sortOrder: "asc" | "desc" = "desc"
    ) =>
        apiService
            .get("/orders", {
                params: {
                    page,
                    pageSize,
                    status,
                    sortBy,
                    sortOrder,
                },
            })
            .then((res) => res.data),

    updateOrder: (orderId: number, data: Partial<Order>) =>
        apiService.patch(`${urls.orders.updateOrder(orderId)}`, data),

    updateOrderStatus: (orderId: number, data: Partial<Order>) =>
        apiService.patch(`${urls.orders.updateOrderStatus(orderId)}`, data),

    deleteOrder: (orderId: number) =>
        apiService.delete(`${urls.orders.deleteOrder(orderId)}`),
};

export { orderService };
