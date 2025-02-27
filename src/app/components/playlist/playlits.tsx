"use client";

import { Button } from "@/components/ui/button";
import { Book } from "@/models/book.model";
import { Playlist, PlaylistCreate } from "@/models/playlist.model";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PlaylistCard } from "./playlist-card";
import { CreatePlaylistDialog } from "./create-playlist-dialog";
import { PlaylistDetails } from "./playlist-details";

export function Playlists() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
    const [isCreatingDialogOpen, setIsCreatingDialogOpen] = useState(false);

    function handleCreatePlaylist(playlist: PlaylistCreate) {
        const newPlaylist: Playlist = {
            ...playlist,
        }
        setPlaylists([...playlists, newPlaylist]);
        setIsCreatingDialogOpen(false);
    }

    function handleAddBook(playlistId: string, book: Book) {
        setPlaylists(
            playlists.map((playlist) => {
                if (playlist.id === playlistId) {
                    return {
                        ...playlist,
                        books: [...playlist.books, book],
                    };
                }
                return playlist;
            })
        )

        if (selectedPlaylist?.id === playlistId) {
            setSelectedPlaylist({
                ...selectedPlaylist,
                books: [...selectedPlaylist.books, book],
            });
        }
    }

    function handleRemoveBook(playlistId: string, bookId: string) {
        setPlaylists(
            playlists.map((playlist) => {
                if (playlist.id === playlistId) {
                    return {
                        ...playlist,
                        books: playlist.books.filter((book) => book.id !== bookId),
                    };
                }
                return playlist;
            })
        )

        if (selectedPlaylist?.id === playlistId) {
            setSelectedPlaylist({
                ...selectedPlaylist,
                books: selectedPlaylist.books.filter((book) => book.id !== bookId),
            });
        }
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Suas Playlists</h2>
                    <Button onClick={() => setIsCreatingDialogOpen(true)} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Playlist
                    </Button>
                </div>

                <div className="space-y-4">
                    {playlists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                            onClick={() => setSelectedPlaylist(playlist)}
                            isSelected={selectedPlaylist?.id === playlist.id}
                        />
                    ))}

                    {playlists.length === 0 && (
                        <div className="text-center p-8 border border-dashed rounded-lg">
                            <p className="text-muted-foreground">No playlists yet. Create your first one!</p>
                        </div>
                    )}
                </div>

                <CreatePlaylistDialog
                    open={isCreatingDialogOpen}
                    onOpenChange={setIsCreatingDialogOpen}
                    onCreate={handleCreatePlaylist}
                />
            </div>

            <div className="md:col-span-2">
                {selectedPlaylist ? (
                    <PlaylistDetails
                        playlist={selectedPlaylist}
                        onAddBook={(book) => handleAddBook(selectedPlaylist.id, book)}
                        onRemoveBook={(bookId) => handleRemoveBook(selectedPlaylist.id, bookId)}
                    />
                ) : (
                    <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">Select a playlist to view details</p>
                    </div>
                )}
            </div>
        </div>
    )
}