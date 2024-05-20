export interface ServerArrayResponse<T> {
    status: string
    code: number,
    data: T[],
    total: number
}