/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from "@/app/models/book.model";
import { IRequester } from "../../http/requester.http";
import { IRepository } from "../../repository/repository";
import { GoogleBooks } from "@/app/models/google-books.model";

export class BookService implements IRepository<Book> {

    constructor(
        private readonly _requester: IRequester
    ) {}

    save(model: Book): Promise<void> {
        return this._requester.post<void>("v1/book/create", model);
    }

    update(model: Book): Promise<void> {
        return this._requester.put<void>(`v1/book/update/${model.id}`, model);
    }

    delete(id: string): Promise<void> {
        return this._requester.delete<void>(`v1/book/delete/${id}`);
    }

    findById(id: string): Promise<Book> {
        return this._requester.get<Book>(`v1/book/search/${id}`);
    }

    findAll(): Promise<Book[]> {
        return this._requester.get<Book[]>("v1/book/search");
    }

    findBook(param: string): Promise<GoogleBooks[]> {
        return this._requester.get(`v1/book/search-book/${param}`);
    }

    translateDescriptionBook(model: Book): Promise<any> {
        return this._requester.put<Book>(`v1/book/update-description/${model.id}`, model);
    }
}