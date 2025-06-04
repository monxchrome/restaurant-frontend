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

    isAuth: () => !! localStorage.getItem(ACCESS_TOKEN_KEY)
}

export {
    authService
}