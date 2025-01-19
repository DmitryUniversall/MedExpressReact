import { ErrorHandler } from "./error_handler.ts";

type HandlerValidator = (error: Error) => boolean;
type ErrorConstructor<T extends Error> = new (...args: never[]) => T;
type HandlerFunction = (error: Error) => void;

// A generic handler that uses validators to determine applicability
abstract class GenericErrorHandler extends ErrorHandler {
    protected readonly validators: HandlerValidator[];
    protected readonly handler: HandlerFunction;

    protected constructor(
        handler: HandlerFunction,
        validators: HandlerValidator[] = [],
    ) {
        super();
        this.handler = handler;
        this.validators = validators;
    }

    public check(error: Error): boolean {
        return this.validators.every((validator) => validator(error));
    }

    public handle(error: Error): void {
        this.handler(error);
    }
}

// A generic error handler that handles a specific type of error
class TypeErrorHandler<T extends Error> extends GenericErrorHandler {
    private readonly errorType: ErrorConstructor<T>;

    public constructor(
        errorType: ErrorConstructor<T>,
        handler: (error: T) => void,
        validators: HandlerValidator[] = []
    ) {
        super(handler as HandlerFunction, validators);
        this.errorType = errorType;
    }

    public check(error: Error): boolean {
        return error instanceof this.errorType && super.check(error);
    }
}

// Factory function for creating type-specific error handlers
function createTypeErrorHandler<T extends Error>(
    errorType: ErrorConstructor<T>,
    handler: (error: T) => void,
    validators: HandlerValidator[] = []
): TypeErrorHandler<T> {
    return new TypeErrorHandler<T>(errorType, handler, validators);
}


export type {
    HandlerValidator
}

export {
    GenericErrorHandler,
    TypeErrorHandler,
    createTypeErrorHandler
}
