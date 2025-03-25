"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Playlist } from "@/app/models/playlist.model";
import { Book, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeletePlaylistDialog } from "./delete-playlist-dialog";

interface PlaylistCardProps {
    playlist: Playlist;
    onClick: () => void;
    onDelete: (idPlaylist: string) => void;
    isSelected: boolean;
}

export function PlaylistCard({ playlist, onClick, onDelete, isSelected }: PlaylistCardProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    function handleOpenDeleteDialog(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        setIsDeleteDialogOpen(true);
    }

    function handleConfirmDelete() {
        onDelete(playlist.id ?? '');
        setIsDeleteDialogOpen(false);
    }

    return (
        <>
            <Card
                className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "border-primary" : ""}`}
                onClick={onClick}
            >
                <CardHeader className="pb-2 relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={handleOpenDeleteDialog}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remover</span>
                    </Button>
                    <CardTitle className="text-lg">{playlist.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{playlist.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Badge>{playlist?.books?.length ?? 0} livros</Badge>
                    </div>
                </CardContent>
            </Card>

            <DeletePlaylistDialog
                playlistName={playlist.title}
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}