import { BookRequestFactory } from "@/core/factories/book.factory";
import { requestError, requestSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function removeBook(id: string) {
    return await BookRequestFactory().delete(id);
}

export function useRemoveBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            requestSuccess("Livro removido com sucesso!");
        },
        onError: (error) => {
            requestError(error.message);
        }
    })
}
