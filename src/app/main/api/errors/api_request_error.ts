import { AxiosRequestConfig, AxiosResponse } from "axios";
import GenericError from "../../../core/errors/generic_error.ts";

class ApiRequestError extends GenericError {
    public readonly name: string = 'ApiRequestError';

    public readonly request: AxiosRequestConfig | null;
    public readonly response: AxiosResponse | null;

    constructor(
        message: string,
        original: Error | null = null,
        request: AxiosRequestConfig | null = null,
        response: AxiosResponse | null = null,
    ) {
        super(message, original);

        this.request = request;
        this.response = response;
    }
}


export default ApiRequestError;
