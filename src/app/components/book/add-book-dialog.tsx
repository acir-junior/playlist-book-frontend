import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Book } from "@/app/models/book.model";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchBooks } from "./hooks/search-books";
import { TruncateTooltip } from "../helpers/truncate-tooltip";
import { GoogleBooks } from "@/app/models/google-books.model";
import { createData } from "@/lib/utils";
import Image from "next/image";

interface AddBookDialogProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onAddBook: (book: Book) => void;
};

export function AddBookDialog({ open, onOpenChange, onAddBook }: AddBookDialogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const { mutate: searchBooks, data: searchResults } = useSearchBooks();

    useEffect(() => {
        searchBooks(searchQuery);
    }, [searchQuery, searchBooks]);
    
    function handleAddExistingBook(book: GoogleBooks) {
        const newBook = createData<Book>({
            title: book.title,
            url: book.url,
            cover: book.cover,
            author: book.author,
            description: book.description,
        });

        onAddBook(newBook);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Adicionar livro a uma Playlist</DialogTitle>
                    <DialogDescription>Pesquise um livro e adicione a sua playlist.</DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Pesquisa por titulo ou autor..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="h-[300px] overflow-y-auto border rounded-md p-2">
                    {searchResults && searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {searchResults?.map((book, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-2 border rounded-md hover:bg-accent cursor-pointer"
                                    onClick={() => handleAddExistingBook(book)}
                                >
                                    <Image
                                        src={book.cover || "/file.svg"}
                                        alt={`Cover of ${book.title}`}
                                        className="w-12 h-16 object-cover"
                                        width={500}
                                        height={300}
                                        quality={100}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{book.title}</p>
                                        <p className="text-sm text-muted-foreground truncate">{book.author}</p>
                                        <p className="text-xs text-muted-foreground">
                                            <TruncateTooltip text={book.description ?? ''} length={150} />
                                        </p>
                                    </div>
                                    <Button size="sm" variant="ghost" className="ml-auto">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground">
                                {searchQuery ? "Nenhum livro encontrado" : "Nenhum livro disponível para adicionar"}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
