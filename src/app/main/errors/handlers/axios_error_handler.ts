import { createTypeErrorHandler, TypeErrorHandler } from "../../../core/errors/processors.ts";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
    data: {
        errors: Record<string, string[]>;
    };
    status?: number;
}

export const axios_error_handler: TypeErrorHandler<AxiosError> = createTypeErrorHandler(AxiosError, (error: AxiosError) => {
    const errorResponse = error.response as ErrorResponse;
    console.error("Got axios error: ", error, errorResponse)
    toast.warning('An unknown error occurred');
}, [])
