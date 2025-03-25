import { PlaylistRequestFactory } from "@/core/factories/playlist.factory";
import { requestError, requestSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deletePlaylist(id: string) {
    return await PlaylistRequestFactory().delete(id);
}

export function useDeletePlaylist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePlaylist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"] });
            requestSuccess("Playlist deletada com sucesso!");
        },
        onError: (error) => {
            requestError(error.message);
        }
    })
}
