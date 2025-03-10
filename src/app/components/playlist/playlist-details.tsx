import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/app/models/book.model";
import { Playlist } from "@/app/models/playlist.model";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BookCard } from "../book/book-card";
import { AddBookDialog } from "../book/add-book-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface PlaylistDetailsProps {
    playlist: Playlist;
    onAddBook: (book: Book) => void;
    onRemoveBook: (bookId: string) => void;
}

export function PlaylistDetails({ playlist, onAddBook, onRemoveBook }: PlaylistDetailsProps) {
    const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl">{playlist.title}</CardTitle>
                        <CardDescription className="mt-2">{playlist.description}</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddBookDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar livro
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="whitespace-nowrap rounded-md border">
                    {playlist.books && playlist.books.length > 0 ? (
                        <div className="flex w-max space-x-4 p-4">
                            {playlist.books.map((book, index) => (
                                <BookCard key={book.id || index} book={book} onRemove={() => onRemoveBook(book.id ?? '')} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 border border-dashed rounded-lg">
                            <p className="text-muted-foreground">Nenhum livro nesta playlist ainda. Adicione seu primeiro livro</p>
                        </div>
                    )}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </CardContent>

            <AddBookDialog
                open={isAddBookDialogOpen}
                onOpenChange={setIsAddBookDialogOpen}
                onAddBook={onAddBook}
            />
        </Card>
    );
}
