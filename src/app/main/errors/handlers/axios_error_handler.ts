import { createTypeErrorHandler, TypeErrorHandler } from "../../../core/errors/processors.ts";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
    data: {
        errors: Record<string, string[]>;
    };
    status?: number;
}

export const Axios_error_handler: TypeErrorHandler<AxiosError> = createTypeErrorHandler(AxiosError, (error: AxiosError) => {
    const err = error.response as ErrorResponse;

    if (Array.isArray(err?.data.errors)) {
        err.data.errors.forEach((val) => {
            toast.warning(val.description);
        });
    } else if (typeof err?.data.errors === 'object') {
        Object.values(err.data.errors).forEach((errorArray) => {
            toast.warning(errorArray[0]);
        });
    } else if (err?.data) {
        toast.warning(JSON.stringify(err.data));
    } else if (err?.status === 401) {  // TODO: Need to logout?
        toast.warning('Please login');
        window.history.pushState({}, 'LoginPage', '/login');
    } else if (err) {
        toast.warning('An unknown error occurred');
    }
}, [])
