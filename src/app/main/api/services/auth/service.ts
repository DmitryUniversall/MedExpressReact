import mainErrorProcessor from "../../../errors/error_processor.ts";
import { API_URL } from "../../api_config.ts";
import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../api_response.ts";
import { AuthData } from "./internal_utils/utils.ts";
import { axiosClient } from "../../../../core/http/axios_client.ts";

const AUTH_ENDPOINT = API_URL + "auth/";
const LOGIN_ENDPOINT = AUTH_ENDPOINT + "login/";
const REGISTER_ENDPOINT = AUTH_ENDPOINT + "register/";

interface LoginRequestParams {
    email: string;
    password: string;
}

const loginAPICall = async (params: LoginRequestParams): Promise<AxiosResponse<ApiResponse<AuthData>>> => {
    try {
        return await axiosClient.post<ApiResponse<AuthData>>(LOGIN_ENDPOINT, params)
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response) mainErrorProcessor.process(error as Error);
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
        if (!axios.isAxiosError(error) || !error.response) mainErrorProcessor.process(error as Error);
        throw error;
    }
}

export {
    loginAPICall,
    registerAPICall
}

export type {
    LoginRequestParams,
    RegisterRequestParams
}
