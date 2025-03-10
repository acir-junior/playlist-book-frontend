import { BookRequestFactory } from "@/core/factories/book.factory";
import { useMutation } from "@tanstack/react-query";

async function searchBooks(param: string) {
    return await BookRequestFactory().findBook(param);
}

export function useSearchBooks() {
    return useMutation({ mutationFn: searchBooks });
}
