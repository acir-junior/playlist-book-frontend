import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "@/app/models/book.model";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { TruncateTooltip } from "../helpers/truncate-tooltip";

interface BookCardProps {
    book: Book;
    onRemove: () => void;
}

export function BookCard({ book, onRemove }: BookCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="w-40 h-60 relative">
                <Image
                    fill
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    className="object-cover w-full h-full"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1">
                    <TruncateTooltip text={book.title} length={15} />
                </h3>
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
                    Remover
                </Button>
            </CardFooter>
        </Card>
    )
}