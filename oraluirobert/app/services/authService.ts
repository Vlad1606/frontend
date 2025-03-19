import apiClient from "@services/apiClient";
import { accessTokenKey, refreshTokenKey } from "@utils/constants";

interface LoginPayload {
    username: string;
    password: string;
    grant_type?: string;
    client_id?: string;
    client_secret?: string;
}

interface LoginResponse {
    access: string;
    refresh: string;
}

class AuthService {
    async login(data: LoginPayload): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>("/o/token/", data);
        console.log(response.data);
        // Store access & refresh tokens securely
        localStorage.setItem(accessTokenKey, response.data.access);
        document.cookie = `refreshToken=${response.data.refresh}; Secure; HttpOnly; Path=/`;
        console.log("response.status:", response.status);
        console.log("response.data:", response.data);

        return response.data;
    }

    async logout() {
        localStorage.removeItem(accessTokenKey);
        document.cookie = `refreshToken=; Path=/; Max-Age=0`;
        window.location.href = "/login";
    }
}

export default new AuthService();
