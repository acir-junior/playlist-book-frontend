import { PlaylistService } from "./playlist/playlist.service";
import { FetchHttp } from "../http/fetch.http";

describe('Service', () => {

    test('save playlist', () => {
        const playlistService = new PlaylistService(new FetchHttp());
        playlistService.save({
            title: 'My Playlist',
            description: 'My Playlist Description',
            author: 'Me'
        });
    })
});