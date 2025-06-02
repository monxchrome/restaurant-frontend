import axios from 'axios';
import { baseURL } from './config';

const apiService = axios.create({ baseURL });

apiService.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { apiService };
