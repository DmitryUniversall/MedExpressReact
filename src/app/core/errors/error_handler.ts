// Abstract base class for error handler
abstract class ErrorHandler {
    abstract handle(error: Error): void;

    abstract check(error: Error): boolean;
}

// ErrorProcessor class that manages and calls registered handlers
class ErrorProcessor {
    private handlers: ErrorHandler[] = [];

    public addHandler(handler: ErrorHandler): void {
        this.handlers.push(handler);
    }

    public process(error: Error): void {
        for (const handler of this.handlers) {
            if (handler.check(error)) {
                handler.handle(error);
            }
        }
    }
}

export {
    ErrorHandler,
    ErrorProcessor
};
