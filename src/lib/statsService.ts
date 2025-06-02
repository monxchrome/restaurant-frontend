import { apiService } from "./apiService";
import { urls } from "@/lib/config";

const statsService = {
    getStatusStats: () => apiService.get(urls.stats.status).then(res => res.data),
    getCountByDay: () => apiService.get(urls.stats.countByDay).then(res => res.data),
    getRevenueByDay: () => apiService.get(urls.stats.revenueByDay).then(res => res.data),
    getAverageCheck: () => apiService.get(urls.stats.averageCheck).then(res => res.data),
    getSummary: () => apiService.get(urls.stats.summary).then(res => res.data),
};

export { statsService };
