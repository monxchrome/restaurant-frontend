export const OrderStatus = {
    PENDING: 'PENDING',
    PREPARING: 'PREPARING',
    READY: 'READY',
    DELIVERING: 'DELIVERING',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

export interface IOrderStatusCount {
    status: OrderStatus
    _count: {
        id: number
    }
}

export interface ISummaryStats {
    totalOrders: number
    totalRevenue: number
    averageCheck: number
}

export interface IRevenueByDay {
    day: string
    revenue: number
}

export interface ICountByDay {
    day: string;
    count: number;
}
