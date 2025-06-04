export const OrderStatus = {
    PENDING: 'PENDING',
    PREPARING: 'PREPARING',
    READY: 'READY',
    DELIVERING: 'DELIVERING',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

export interface OrderStatusCount {
    status: OrderStatus
    _count: {
        id: number
    }
}

export interface SummaryStats {
    totalOrders: number
    totalRevenue: number
    averageCheck: number
    countByStatus: OrderStatusCount[]
}

export interface RevenueByDay {
    day: string
    revenue: number
}
