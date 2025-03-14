/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRequester } from "./requester.http";

export class FetchHttp implements IRequester {

    api: string = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:7000';

    async get<T>(url: string): Promise<T> {
        console.log(this.api);
        
        const response = await fetch(`${this.api}/${url}`);
        return response.json();
    }

    async post<T>(url: string, body: any): Promise<T> {
        const response = await fetch(`${this.api}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return response.json();
    }

    async put<T>(url: string, body: any): Promise<T> {
        const response = await fetch(`${this.api}/${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return response.json();
    }

    async delete<T>(url: string): Promise<T> {
        const response = await fetch(`${this.api}/${url}`, {
            method: "DELETE",
        });
        return response.json();
    }
}