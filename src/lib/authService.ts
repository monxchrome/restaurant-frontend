import {apiService} from "@/lib/apiService";
import {urls} from "@/lib/config";

const ACCESS_TOKEN_KEY =  'accessToken'

const authService = {
    getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

    setAccessToken: (token: string) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },

    clearAccessToken: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },

    refreshToken: async () => {
        try {
            const response = await apiService.post(urls.auth.refresh);
            const { accessToken } = response.data;

            authService.setAccessToken(accessToken);

            return accessToken;
        } catch (e) {
            authService.clearAccessToken();
            throw e;
        }
    },

    isAuth: () => !! localStorage.getItem(ACCESS_TOKEN_KEY),

    logout: async () => {
        try {
            await apiService.post(urls.auth.logout);
        } catch (e) {
            console.error('Logout failed:', e);
        } finally {
            authService.clearAccessToken();
        }
    },

    getCurrentUser: async () => {
        const token = authService.getAccessToken();
        if (!token) throw new Error('Нет access токена');

        const res = await apiService.get(urls.auth.me, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    }
}

export {
    authService
}