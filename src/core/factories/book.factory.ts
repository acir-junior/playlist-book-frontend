import { FetchHttp } from "../infra/http/fetch.http";
import { BookService } from "../infra/services/book/book.service";

export function BookRequestFactory() {
    const fetchHttp = new FetchHttp();
    return new BookService(fetchHttp);
}