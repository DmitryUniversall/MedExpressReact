import axios from "axios";
import { API_URL } from "../../main/api/api_config.ts";
import { AuthData } from "../../main/api/services/auth/internal_utils/utils.ts";
import ApiResponse from "../../main/api/api_response.ts";

interface TokensData {
    tokens: {
        access_token: string;
        refresh_token: string;
    }
}

const axiosClient = axios.create({
    baseURL: API_URL,
});

const setAxiosAccessToken = (getAuthData: () => AuthData | null) => {
    axiosClient.interceptors.request.use((config) => {
        const authData: AuthData | null = getAuthData();
        if (!authData) return config;

        const accessToken: string = authData.tokens.access_token;
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${ accessToken }`;
        } else if (config.headers && config.headers.Authorization) {
            delete config.headers.Authorization;
        }

        return config;
    });
}


const setupAxiosInterceptors = (
    getAuthData: () => AuthData | null,
    setAuthData: (data: AuthData | null) => void,
    logoutUser: () => void
) => {
    axiosClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (!(error.response?.status === 401 && !originalRequest._retry)) return Promise.reject(error);
            if (!(error.response.data && error.response.data.application_status_code == 3005)) return Promise.reject(error);

            originalRequest._retry = true;

            const authData: AuthData | null = getAuthData();
            if (!authData) return Promise.reject(error);

            try {
                const response = await axios.post("/api/auth/refresh", { refresh_token: authData.tokens.refresh_token });
                if (!response.data) throw Error("Authentication failed to update refresh token: response has no data");

                const apiResponse: ApiResponse<TokensData> = response.data;
                if (!response.data.ok) throw Error(`Authentication failed to update refresh token: (${ response.data.application_status_code }) ${ response.data.message }`);

                const newAccessToken = apiResponse.data.tokens.access_token;
                const newRefreshToken = apiResponse.data.tokens.refresh_token;

                authData.tokens.access_token = newAccessToken;
                authData.tokens.refresh_token = newRefreshToken;

                setAuthData(authData);
                originalRequest.headers["Authorization"] = `Bearer ${ newAccessToken }`;

                return axiosClient(originalRequest);
            } catch (err) {
                console.error("Token refresh failed", err);

                // Perform logout
                logoutUser();
                window.location.href = "/auth"; // TODO: Redirect to login page
            }

            return Promise.reject(error);
        }
    );
}

const setupAxiosClient = (
    getAuthData: () => AuthData | null,
    setAuthData: (data: AuthData | null) => void,
    logoutUser: () => void
) => {
    setAxiosAccessToken(getAuthData);
    setupAxiosInterceptors(getAuthData, setAuthData, logoutUser);
}


export {
    axiosClient,
    setupAxiosClient
};
