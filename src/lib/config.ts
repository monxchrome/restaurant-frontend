const baseURL = process.env.NEXT_PUBLIC_API_URL;

const urls = {
    auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
    },
    stats: {
        status: "/orders/stats/status",
        countByDay: "/orders/stats/count-by-day",
        revenueByDay: "/orders/stats/revenue-by-day",
        averageCheck: "/orders/stats/average-check",
        summary: "/orders/stats/summary",
    },
    users: {
        getById: (userId: number) => `/users/${userId}`,
        updateUser: (userId: number) => `/users/${userId}`,
        changePassword: '/users/changePassword',
    },
    orders: {
        getAll: '/orders',
        getById: (orderId: number) => `/orders/${orderId}`,
        createOrder: '/orders',
        updateOrder: (orderId: number) => `/orders/${orderId}`,
        updateOrderStatus: (orderId: number) => `/orders/${orderId}/status`,
        deleteOrder: (orderId: number) => `/orders/${orderId}`,
    },
};

export {
    baseURL,
    urls,
};
