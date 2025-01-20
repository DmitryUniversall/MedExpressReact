import ApiResponse from "../api_response.ts";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import GenericError from "../../../core/errors/generic_error.ts";

class ApiRespondedError<T> extends GenericError {
    public readonly name: string = 'ApiRespondedError';

    public readonly request: AxiosRequestConfig | null;
    public readonly response: AxiosResponse<ApiResponse<T>>;
    public readonly responseData: ApiResponse<T>;

    constructor(
        message: string,
        original: Error | null,
        request: AxiosRequestConfig | null,
        response: AxiosResponse<ApiResponse<T>>
    ) {
        super(message, original);

        this.request = request;
        this.response = response;
        this.responseData = response.data;
    }
}


export default ApiRespondedError;
