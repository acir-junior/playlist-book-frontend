/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IRequester } from "./requester.http";

export class AxiosHttp implements IRequester {
    app: any;
    api: string = "http://localhost:7000";

    constructor() {
        this.app = axios.create();
    }

    async get<T>(url: string): Promise<T> {
        const response = await this.app.get(`${this.api}/${url}`);
        return response.data;
    }

    async post<T>(url: string, body: any): Promise<T> {
        const response = await this.app.post(`${this.api}/${url}}`, body);
        return response.data;
    }

    async put<T>(url: string, body: any): Promise<T> {
        const response = await this.app.put(`${this.api}/${url}`, body);
        return response.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.app.delete(`${this.api}/${url}}`);
        return response.data;
    }
}