import { replaceHTML } from "@/lib/utils";
import { z } from "zod";

export const createBookSchema = z.object({
    title: z.string().nonempty("O título é obrigatório")
        .max(100, "O título deve ter no máximo 100 caracteres")
        .transform((value) => replaceHTML(value)),
    author: z.string().max(100, "O autor deve ter no máximo 100 caracteres")
        .transform((value) => replaceHTML(value))
        .optional(),
    url: z.string().nonempty("A URL é obrigatória")
        .max(500, "A URL deve ter no máximo 500 caracteres")
        .transform((value) => replaceHTML(value)),
    description: z.string().nonempty("A descrição é obrigatória")
        .max(500, "A descrição deve ter no máximo 500 caracteres")
        .transform((value) => replaceHTML(value))
});

export type CreateBook = z.infer<typeof createBookSchema>;
