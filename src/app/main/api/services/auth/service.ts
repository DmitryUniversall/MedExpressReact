import mainErrorProcessor from "../../../errors/error_processor.ts";
import { API_URL } from "../../api.ts";
import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../api_response.ts";
import { AuthData } from "./utils/utils.ts";

const AUTH_ENDPOINT = API_URL + "auth/";
const LOGIN_ENDPOINT = AUTH_ENDPOINT + "login/";
const REGISTER_ENDPOINT = AUTH_ENDPOINT + "register/";

interface LoginRequestParams {
    email: string;
    password: string;
}

const loginAPICall = async (params: LoginRequestParams): Promise<AxiosResponse<ApiResponse<AuthData>> | null> => {
    try {
        return await axios.post<ApiResponse<AuthData>>(LOGIN_ENDPOINT, params)
    } catch (error) {
        mainErrorProcessor.process(error as Error)  // TODO: Check if error is not instance of Error
        return null
    }
}


interface RegisterRequestParams {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

const registerAPICall = async (params: RegisterRequestParams): Promise<AxiosResponse<ApiResponse<AuthData>> | null> => {
    try {
        return await axios.post<ApiResponse<AuthData>>(REGISTER_ENDPOINT, params)
    } catch (error) {
        mainErrorProcessor.process(error as Error)  // TODO: Check if error is not instance of Error
        return null
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
