import { FetchHttp } from "../infra/http/fetch.http";
import { PlaylistService } from "../infra/services/playlist/playlist.service";

export function PlaylistRequestFactory() {
    const fetchHttp = new FetchHttp();
    return new PlaylistService(fetchHttp);
}   