import { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiRequestError from "./api_request_error.ts";

class InvalidResponseFormatError extends ApiRequestError {
    public readonly name: string = 'InvalidResponseFormatError';

    constructor(
        message: string,
        original: Error | null,
        request: AxiosRequestConfig,
        response: AxiosResponse
    ) {
        super(message, original, request, response);
    }
}

export default InvalidResponseFormatError;
