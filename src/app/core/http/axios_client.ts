import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_REQUEST_TIMEOUT, API_URL } from "../../main/api/api_config.ts";
import { AuthData, AuthTokenPair } from "../../main/api/services/auth/internal_utils/utils.ts";
import ApiResponse from "../../main/api/api_response.ts";
import ApiRespondedError from "../../main/api/errors/api_responded_error.ts";
import ApiRequestError from "../../main/api/errors/api_request_error.ts";
import InvalidResponseFormatError from "../../main/api/errors/invalid_response_format.ts";
import { refreshTokensAPICall } from "../../main/api/services/auth/service.ts";
import { pathSearch } from "../routing/path.ts";
import mainLayoutRouting from "../../main/layouts/main_layout/routing.ts";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
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
            if (!isValidApiResponse(response.data)) throw new InvalidResponseFormatError("Invalid response format", null, response.request, response);

            // Check if the request is successful
            if (!response.data.ok) throw new ApiRespondedError(`Api responded an error: ${ response.data.message }`, null, response.request, response);
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

            console.log("SET TOKEN", authData, request.headers)

            return request;
        }
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
            if (!(error.original instanceof AxiosError)) return Promise.reject(error);

            const originalRequest = error.original.config as CustomAxiosRequestConfig;
            if (!originalRequest) return Promise.reject(error);

            // Check if original request failed due to token expiration
            if (error.response?.status !== 401 || originalRequest._retry) return Promise.reject(error);
            if (!error.response.data || error.response.data.application_status_code != 3005) return Promise.reject(error);

            // Check that user is authorized and we have refresh_token
            const authData: AuthData | null = getAuthData();
            if (!authData) return Promise.reject(error);

            // Mark that we're resending original request
            originalRequest._retry = true;

            try {
                const response: AxiosResponse<ApiResponse<AuthTokenPair>> = await refreshTokensAPICall({ refresh_token: authData.tokens.refresh_token })
                const newTokenPair: AuthTokenPair = response.data.data;

                authData.tokens = newTokenPair;
                setAuthData(authData);

                originalRequest.headers["Authorization"] = `Bearer ${ newTokenPair.access_token }`;
                return axiosClient(originalRequest);
            } catch (err) {
                // Token refresh failed, perform logout

                console.error("Token refresh failed: ", err);
                logoutUser();
                window.location.href = pathSearch(mainLayoutRouting, "auth=>main", {}); // TODO: Redirect to login page
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
