import { replaceHTML } from "@/lib/utils";
import { z } from "zod";

export const createPlaylistSchema = z.object({
    title: z.string().nonempty("O título é obrigatório")
        .max(100, "O título deve ter no máximo 100 caracteres")
        .transform((value) => replaceHTML(value)),
    description: z.string().max(500, "A descrição deve ter no máximo 500 caracteres")
        .transform((value) => replaceHTML(value))
        .optional(),
    author: z.string().nonempty("O autor é obrigatório")
        .max(100, "O autor deve ter no máximo 100 caracteres")
        .transform((value) => replaceHTML(value)),
});

export type CreatePlaylist = z.infer<typeof createPlaylistSchema>;
