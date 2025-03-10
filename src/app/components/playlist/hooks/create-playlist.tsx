import { Playlist } from "@/app/models/playlist.model";
import { PlaylistRequestFactory } from "@/core/factories/playlist.factory";
import { requestError, requestSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createPlaylist(playlist: Playlist) {
    return PlaylistRequestFactory().save(playlist);
}

export function useCreatePlaylist() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createPlaylist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"] });
            requestSuccess("Playlist criada com sucesso!");
        },
        onError: (error) => {
            requestError(error.message);
        }
    })
}
