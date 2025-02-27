import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "@/models/book.model";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
    book: Book;
    onRemove: () => void;
}

export function BookCard({ book, onRemove }: BookCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="aspect-[2/3] relative">
                <Image
                    src={book.cover || "/placeholder.svg"}
                    alt={`Cover of ${book.title}`}
                    className="object-cover w-full h-full"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-destructive hover:text-destructive"
                    onClick={onRemove}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                </Button>
            </CardFooter>
        </Card>
    )
}