import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_REQUEST_TIMEOUT, API_URL } from "../../main/api/api_config.ts";
import ApiResponse from "../../main/api/api_response.ts";
import ApiRespondedError from "../../main/api/errors/api_responded_error.ts";
import ApiRequestError from "../../main/api/errors/api_request_error.ts";
import InvalidResponseFormatError from "../../main/api/errors/invalid_response_format.ts";
import { refreshTokensAPICall } from "../../main/api/services/auth/service.ts";
import { pathSearch } from "../routing/path.ts";
import mainLayoutRouting from "../../main/layouts/main_layout/routing.tsx";
import { AuthData } from "../../main/api/services/auth/models/auth_data.ts";
import { AuthTokenPair } from "../../main/api/services/auth/models/auth_token_pair.ts";

let REFRESH_LOCK: boolean = false

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: API_REQUEST_TIMEOUT,
    validateStatus: (): true => {
        return true;
    }
});

const isValidApiResponse = <T>(response: any): response is ApiResponse<T> => {
    return (
        typeof response === 'object' &&
        response !== null &&
        typeof response.ok === 'boolean' &&
        typeof response.message === 'string' &&
        ('data' in response)
    );
};

const setupAxiosErrorHandling = () => {
    axiosClient.interceptors.response.use(
        (response: AxiosResponse) => {
            // Check if the response conforms to the expected structure
            if (!isValidApiResponse(response.data)) return Promise.reject(new InvalidResponseFormatError("Invalid response format", null, response.request, response));

            // Check if the request is successful
            if (!response.data.ok) return Promise.reject(new ApiRespondedError(`Api responded an error: ${ response.data.message }`, null, response.request, response));
            return response;
        },
        (error: AxiosError) => {
            // There was an error during request (Like network errors, etc.)
            return Promise.reject(new ApiRequestError(`Api request failed: ${ error.message }`, error, error.request || null, error.response || null));
        }
    );
}

const setupAxiosAutoAccessToken = (getAuthData: () => AuthData | null) => {
    axiosClient.interceptors.request.use(
        (request) => {
            const authData: AuthData | null = getAuthData();
            if (!authData) return request;

            const accessToken: string = authData.tokens.access_token;
            if (accessToken && request.headers) request.headers.Authorization = `Bearer ${ accessToken }`;

            return request;
        },
        (error) => Promise.reject(error)
    );
}


const setupAxiosTokenRefresh = (
    getAuthData: () => AuthData | null,
    setAuthData: (data: AuthData | null) => void,
    logoutUser: () => void
) => {
    axiosClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            // We're waiting for request that was rejected by server, so server should respond
            // Because of error handling interceptor, error must be of type ApiRespondedError
            if (!(error instanceof ApiRespondedError)) return Promise.reject(error);
            if (error.request == null) return Promise.reject(error);

            const originalRequest = error.request as CustomAxiosRequestConfig;
            if (!originalRequest) return Promise.reject(error);

            // Check if original request failed due to token expiration
            if (error.response?.status !== 401 || originalRequest._retry) return Promise.reject(error);
            if (!error.response.data || error.response.data.application_status_code != 3005) return Promise.reject(error);
            if (REFRESH_LOCK) return;

            // Check that user is authorized and we have refresh_token
            const authData: AuthData | null = getAuthData();
            if (!authData) return Promise.reject(error);

            // Mark that we're resending original request
            originalRequest._retry = true;

            try {
                REFRESH_LOCK = true;

                const response: AxiosResponse<ApiResponse<AuthTokenPair>> = await refreshTokensAPICall({ refresh_token: authData.tokens.refresh_token })
                const newTokenPair: AuthTokenPair = response.data.data;

                authData.tokens = newTokenPair;
                setAuthData(authData);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers["Authorization"] = `Bearer ${ newTokenPair.access_token }`;

                console.log("Tokens refreshed")
                return axiosClient(originalRequest);
            } catch (err) {
                // Token refresh failed, perform logout

                console.error("Token refresh failed: ", err);
                logoutUser();
                window.location.href = pathSearch(mainLayoutRouting, "auth=>main", {});
            } finally {
                REFRESH_LOCK = false;
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
    // Must be first
    setupAxiosErrorHandling();

    setupAxiosAutoAccessToken(getAuthData);
    setupAxiosTokenRefresh(getAuthData, setAuthData, logoutUser);

}


export {
    axiosClient,
    setupAxiosClient
};
