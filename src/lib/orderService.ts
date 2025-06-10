import {apiService} from '@/lib/apiService';
import {urls} from '@/lib/config';
import {IOrder} from "@/types/order.type";

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

    updateOrder: (orderId: number, data: Partial<IOrder>) =>
        apiService.patch(`${urls.orders.updateOrder(orderId)}`, data),

    updateOrderStatus: (orderId: number, data: Partial<IOrder>) =>
        apiService.patch(`${urls.orders.updateOrderStatus(orderId)}`, data),

    deleteOrder: (orderId: number) =>
        apiService.delete(`${urls.orders.deleteOrder(orderId)}`),
};

export { orderService };
