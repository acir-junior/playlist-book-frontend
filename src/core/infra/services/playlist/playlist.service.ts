import { Playlist, PlaylistCreate } from "@/app/models/playlist.model";
import { IRepository } from "../../repository/repository";
import { IRequester } from "../../http/requester.http";

export class PlaylistService implements IRepository<Playlist> {

    constructor(
        private readonly _requester: IRequester
    ) {}

    save(model: PlaylistCreate): Promise<void> {
        return this._requester.post<void>("v1/playlist/create", model);
    }

    update(model: Playlist): Promise<void> {
        return this._requester.put<void>("v1/playlist/update", model);
    }

    delete(id: string): Promise<void> {
        return this._requester.delete<void>(`v1/playlist/delete/${id}`);
    }

    findById(id: string): Promise<Playlist> {
        return this._requester.get<Playlist>(`v1/playlist/search/${id}`);
    }

    findAll(): Promise<Playlist[]> {
        return this._requester.get<Playlist[]>("v1/playlist/search");
    }
}