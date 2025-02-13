import mainErrorProcessor from "../../../errors/error_processor.ts";
import { API_URL } from "../../api_config.ts";
import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../api_response.ts";
import { axiosClient } from "../../../../core/http/axios_client.ts";
import { AuthData } from "./models/auth_data.ts";
import { AuthTokenPair } from "./models/auth_token_pair.ts";

const AUTH_ENDPOINT: string = API_URL + "auth/";
const LOGIN_ENDPOINT: string = AUTH_ENDPOINT + "login/";
const REGISTER_ENDPOINT: string = AUTH_ENDPOINT + "register/";
const REFRESH_ENDPOINT: string = AUTH_ENDPOINT + "refresh/";

interface LoginRequestParams {
    email: string;
    password: string;
}

const loginAPICall = async (params: LoginRequestParams): Promise<AxiosResponse<ApiResponse<AuthData>>> => {
    try {
        return await axiosClient.post<ApiResponse<AuthData>>(LOGIN_ENDPOINT, params)
    } catch (error) {
        mainErrorProcessor.process(error as Error);  // TODO: Is it needed here?
        throw error;
    }
}


interface RegisterRequestParams {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

const registerAPICall = async (params: RegisterRequestParams): Promise<AxiosResponse<ApiResponse<AuthData>>> => {
    try {
        return await axiosClient.post<ApiResponse<AuthData>>(REGISTER_ENDPOINT, params)
    } catch (error) {
        mainErrorProcessor.process(error as Error);
        throw error;
    }
}


interface RefreshTokensRequestParams {
    refresh_token: string;
}


const refreshTokensAPICall = async (params: RefreshTokensRequestParams): Promise<AxiosResponse<ApiResponse<AuthTokenPair>>> => {
    try {
        return await axios.post<ApiResponse<AuthTokenPair>>(REFRESH_ENDPOINT, params);
    } catch (error) {
        mainErrorProcessor.process(error as Error);
        throw error;
    }
}

export {
    loginAPICall,
    registerAPICall,
    refreshTokensAPICall
}

export type {
    LoginRequestParams,
    RegisterRequestParams
}
