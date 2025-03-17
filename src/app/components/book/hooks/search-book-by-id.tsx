import { BookRequestFactory } from "@/core/factories/book.factory";
import { useMutation } from "@tanstack/react-query";

async function searchBookById(id: string) {
    return await BookRequestFactory().findById(id);
}

export function useSearchBookById() {
    return useMutation({ mutationFn: searchBookById });
}
