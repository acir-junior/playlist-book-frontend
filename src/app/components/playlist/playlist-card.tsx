import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Playlist } from "@/models/playlist.model";
import { Badge, Book } from "lucide-react";

interface PlaylistCardProps {
    playlist: Playlist;
    onClick: () => void;
    isSelected: boolean;
}

export function PlaylistCard({ playlist, onClick, isSelected }: PlaylistCardProps) {
    return (
        <Card
            className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "border-primary" : ""}`}
            onClick={onClick}
        >
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{playlist.title}</CardTitle>
                <CardDescription className="line-clamp-2">{playlist.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Badge>{playlist.books.length} books</Badge>
                </div>
            </CardContent>
        </Card>
    )
}