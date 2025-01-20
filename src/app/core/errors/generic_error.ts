abstract class GenericError extends Error {
    public abstract readonly name: string;

    public readonly original: Error | null;

    protected constructor(message: string, original: Error | null = null) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        if (Error.captureStackTrace) Error.captureStackTrace(this, GenericError);

        this.original = original;
    }
}


export default GenericError;
