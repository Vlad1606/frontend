import axios from "axios";
import { accessTokenKey, refreshTokenKey } from "@utils/constants";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Ensure cookies are sent with requests
});

// Request Interceptor: Attach token automatically
apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem(accessTokenKey);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.error("Access token expired. Trying to refresh...");
            
            const refreshToken = document.cookie.replace(
                /(?:(?:^|.*;\s*)refreshToken\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
            );

            console.log("Refresh token being sent:", refreshToken); // Debugging

            // ❌ Prevent sending request if refresh token is missing or empty
            if (!refreshToken || refreshToken.trim() === "") {
                console.error("No valid refresh token found, logging out user.");
                if (window.location.pathname !== "/login") {
                    localStorage.clear();
                    window.location.href = "/login";
                }
                return Promise.reject(new Error("No valid refresh token available"));
            }

            try {
                const res = await apiClient.post(
                    `/o/token/refresh/`,
                    { refresh: refreshToken },
                    { withCredentials: true }
                );

                if (res.status === 200) {
                    localStorage.setItem(accessTokenKey, res.data.access);
                    apiClient.defaults.headers.Authorization = `Bearer ${res.data.access}`;
                    return apiClient(error.config);
                }
            } catch (refreshError) {
                console.error("Error refreshing token, redirecting to login.");
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
