import { Playlist } from "./playlist.model";

export interface Book {
    id?: string;
    title: string;
    url: string;
    cover: string;
    author?: string;
    description?: string;
    playlistId?: string;
    playlists?: Playlist[];
}
