import { PlaylistRequestFactory } from "@/core/factories/playlist.factory";
import { useQuery } from "@tanstack/react-query";

async function getPlaylists() {
    return await PlaylistRequestFactory().findAll();
}

export function useAllPlaylists() {
    return useQuery({
        queryKey: ["playlists"],
        queryFn: getPlaylists,
        staleTime: 1000 * 60 * 5,
    })
}
