const API_URL: string | undefined = import.meta.env.VITE_API_URL ;
if (!API_URL) throw new Error("VITE_API_URL is not defined.");

const API_REQUEST_TIMEOUT: number = 5000;


export {
    API_URL,
    API_REQUEST_TIMEOUT
}
