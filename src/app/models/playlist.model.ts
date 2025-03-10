import { Book } from "./book.model";

export interface Playlist {
    id?: string;
    title: string;
    description?: string;
    author: string;
    books?: Book[];
}

export interface PlaylistCreate {
    title: string;
    description?: string;
    author: string;
}
