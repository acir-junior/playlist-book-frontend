import { PlaylistCreate } from "@/app/models/playlist.model";
import { useForm } from "react-hook-form";
import { CreatePlaylist, createPlaylistSchema } from "./schema/create-playlist.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CreatePlaylistDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (playlist: PlaylistCreate) => void;
}

export function CreatePlaylistDialog({ open, onOpenChange, onCreate }: CreatePlaylistDialogProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreatePlaylist>({
        resolver: zodResolver(createPlaylistSchema),
    })

    function handleCreatePlaylist(data: CreatePlaylist) {
        onCreate({
            title: data.title,
            description: data.description ?? "",
            author: data.author,
        });
        reset();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(handleCreatePlaylist)}>
                    <DialogHeader>
                        <DialogTitle>Nova Playlist</DialogTitle>
                        <DialogDescription>Crie playlists de livros para organizar suas leituras favoritas.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="text">Nome da playlist</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Meus livros favoritos"
                                { ...register("title") }
                            />
                            {  errors.title && <p className="text-sm text-red-500">{errors.title.message}</p> }
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="author">Autor</Label>
                            <Input
                                type="text"
                                id="author"
                                placeholder="O melhor autor do mundo"
                                { ...register("author") }
                            />
                            {  errors.author && <p className="text-sm text-red-500">{errors.author.message}</p> }
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                placeholder="Uma coleção de livros que eu amo..."
                                rows={3}
                                { ...register("description") }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button disabled={isSubmitting}>Criar playlist</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}