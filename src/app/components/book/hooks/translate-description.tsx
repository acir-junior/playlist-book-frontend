import { Book } from "@/app/models/book.model";
import { BookRequestFactory } from "@/core/factories/book.factory";
import { requestError, requestSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function translateDescription(book: Book) {
    return await BookRequestFactory().translateDescriptionBook(book);
}

export function useTranslateDescription() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: translateDescription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            requestSuccess("Descrição traduzida com sucesso!");
        },
        onError: (error) => {
            requestError(error.message);
        }
    });
}
