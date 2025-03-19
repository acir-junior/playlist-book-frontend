"use client";

import { Button } from "@/components/ui/button";
import { Book } from "@/app/models/book.model";
import { Playlist, PlaylistCreate } from "@/app/models/playlist.model";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PlaylistCard } from "./playlist-card";
import { CreatePlaylistDialog } from "./create-playlist-dialog";
import { PlaylistDetails } from "./playlist-details";
import { useAllPlaylists } from "./hooks/all-playlists";
import { useCreatePlaylist } from "./hooks/create-playlist";
import { useSaveBook } from "../book/hooks/save-book";
import { createData } from "@/lib/utils";
import { useRemoveBook } from "../book/hooks/remove-book";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Playlists() {
    const { data: allPlaylists, refetch: getPlaylists } = useAllPlaylists();
    const { mutate: createPlaylist } = useCreatePlaylist();

    const { mutate: saveBook } = useSaveBook();
    const { mutate: deleteBook } = useRemoveBook();

    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
    const [isCreatingDialogOpen, setIsCreatingDialogOpen] = useState(false);

    function handleCreatePlaylist(playlist: PlaylistCreate) {
        const newPlaylist = createData<Playlist>({
            ...playlist,
        });

        createPlaylist(newPlaylist, {
            onSuccess: () => {
                getPlaylists();
                setIsCreatingDialogOpen(false);
            },
        });
    }

    function handleAddBook(playlistId: string, book: Book) {
        const newBook = createData<Book>({
            ...book,
            playlistId: playlistId,
        });
        
        saveBook(newBook, {
            onSuccess: () => {
                getPlaylists().then((updatedPlaylists) => {
                    if (updatedPlaylists.data) {
                        const updatedPlaylist = updatedPlaylists.data.find(
                            (playlist) => playlist.id === playlistId
                        );
    
                        if (updatedPlaylist) {
                            setSelectedPlaylist(updatedPlaylist);
                        }
                    }
                })
            },
        });
        
        if (selectedPlaylist?.id === playlistId) {
            setSelectedPlaylist({
                ...selectedPlaylist,
                books: [...selectedPlaylist.books ?? [], book],
            });
        }
    }

    function handleRemoveBook(playlistId: string, bookId: string) {
        if (selectedPlaylist?.id === playlistId) {
            setSelectedPlaylist({
                ...selectedPlaylist,
                books: selectedPlaylist.books ? selectedPlaylist.books.filter((book) => book.id !== bookId) : [],
            });
        }

        deleteBook(bookId, {
            onSuccess: () => getPlaylists(),
        });
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

                <ScrollArea className="h-[calc(100vh-270px)] min-h-[300px] pr-4">
                    <div className="space-y-4 pb-2">
                        {allPlaylists && allPlaylists.map((playlist) => (
                            <PlaylistCard
                                key={playlist.id}
                                playlist={playlist}
                                onClick={() => setSelectedPlaylist(playlist)}
                                isSelected={selectedPlaylist?.id === playlist.id}
                            />
                        ))}

                        {allPlaylists && allPlaylists.length === 0 && (
                            <div className="text-center p-8 border border-dashed rounded-lg">
                                <p className="text-muted-foreground">Nenhuma playlist criada. Crie sua primeira!</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

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
                        onAddBook={(book) => handleAddBook(selectedPlaylist.id ?? '', book)}
                        onRemoveBook={(bookId) => handleRemoveBook(selectedPlaylist.id ?? '', bookId)}
                    />
                ) : (
                    <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">Selecione uma playlist para visualizar os detalhes</p>
                    </div>
                )}
            </div>
        </div>
    )
}