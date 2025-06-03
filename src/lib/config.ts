const baseURL = process.env.NEXT_PUBLIC_API_URL;

const urls = {
    login: '/auth/login',
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
};

export {
    baseURL,
    urls,
};
