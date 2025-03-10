/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequester {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, body: any): Promise<T>;
    put<T>(url: string, body: any): Promise<T>;
    delete<T>(url: string): Promise<T>;
}