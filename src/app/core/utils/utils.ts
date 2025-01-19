const classNames = (...args: (string | Record<string, boolean> | undefined)[]): string => {
    return args
        .flatMap(arg => {
            if (typeof arg === "string") return arg; // Add plain strings
            if (typeof arg === "object" && arg !== null) {
                return Object.entries(arg)
                    .filter(([_, value]) => value) // Include only truthy values
                    .map(([key]) => key); // Return class names
            }
            return []; // Skip undefined or invalid inputs
        })
        .join(" ");
};

export {
    classNames
}
