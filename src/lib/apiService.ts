import axios from 'axios';
import { baseURL } from './config';
import {authService} from "@/lib/authService";

const apiService = axios.create({ baseURL, withCredentials: true });

apiService.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiService.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await authService.refreshToken();
                const newToken = authService.getAccessToken();
                if (newToken) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                }
                return apiService(originalRequest);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                authService.clearAccessToken();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export { apiService };
