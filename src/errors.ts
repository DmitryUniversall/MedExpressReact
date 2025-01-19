import mainErrorProcessor from "./app/main/errors/error_processor.ts";
import { ErrorHandler } from "./app/core/errors/error_handler.ts";
import { Axios_error_handler } from "./app/main/errors/handlers/axios_error_handler.ts";

const handlers: ErrorHandler[] = [
    Axios_error_handler
];

handlers.forEach(handler => mainErrorProcessor.addHandler(handler));
