export type OrderStatus = "PENDING" | "PREPARING" | "DELIVERED" | "CANCELLED" | "READY" | "DELIVERING"

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
