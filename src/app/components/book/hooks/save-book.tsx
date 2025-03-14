import { Book } from "@/app/models/book.model";
import { BookRequestFactory } from "@/core/factories/book.factory";
import { requestError, requestSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function saveBook(book: Book) {
    return BookRequestFactory().save(book);
}

export function useSaveBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            requestSuccess("Livro salvo com sucesso!");
        },
        onError: (error) => {
            requestError(error.message);
        }
    });
}
