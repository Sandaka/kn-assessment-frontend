export interface ApiResponse<T> {
    statusCode: number;
    status: string;
    timeStamp: string;
    message: string;
    data: { page: T };
}