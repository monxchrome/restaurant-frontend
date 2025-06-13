import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { baseURL } from './config';
import { authService } from "@/lib/authService";

const apiService = axios.create({
    baseURL,
    withCredentials: true,
});

apiService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

apiService.interceptors.response.use(
    response => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        if (error.response?.status === 401 && originalRequest.url !== '/auth/refresh' && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                console.log("Токен просрочен. Пытаюсь обновить...");
                const newAccessToken = await authService.refreshToken();

                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                }
                return apiService(originalRequest);

            } catch (refreshError) {
                console.log("Не удалось обновить токен. Выхожу из системы.");
                authService.logout();

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { apiService };