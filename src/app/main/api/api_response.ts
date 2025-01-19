export default interface ApiResponse<T> {
    ok: boolean;
    message: string;
    application_status_code: number;
    data: T;
}
