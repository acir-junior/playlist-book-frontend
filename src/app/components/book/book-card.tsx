import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "@/app/models/book.model";
import { Trash2 } from "lucide-react";
import { TruncateTooltip } from "../helpers/truncate-tooltip";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
    book: Book;
    onRemove: () => void;
    showDetails?: boolean;
}

export function BookCard({ book, onRemove, showDetails = true }: BookCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="w-40 h-60 relative">
                <Image
                    fill
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    className="object-cover w-full h-full"
                    quality={100}
                />
                {showDetails && (
                    <Link
                        href={`/book-detail/${book.id}`}
                        className="absolute inset-0 bg-black/0 hover:bg-black/40
                        transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
                    >
                        <Button variant="outline" size="sm">Detalhes</Button>
                    </Link>
                )}
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1">
                    <TruncateTooltip text={book.title} length={13} />
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