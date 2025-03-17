import { use } from "react";
import { BookRequestFactory } from "@/core/factories/book.factory";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

type BookDetailPageParams = {
    params: { id: string };
};

async function searchBookById(id: string) {
    return await BookRequestFactory().findById(id);
}

export default function BookDetailPage({ params }: BookDetailPageParams) {
    const { id } = params;
    const book = use(searchBookById(id));

    if (!book || !id) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Link href="/">
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                </Link>
                <Card>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                        <h1 className="text-2xl font-bold mb-4">Livro não encontrado</h1>
                        <p className="text-muted-foreground mb-4">
                            O livro que você está procurando não existe ou foi removido.
                        </p>
                        <Link href="/">
                            <Button className="mb-4">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retornar à página inicial
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-6 px-4">
            <Link href="/">
                <Button variant="ghost" className="mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                </Button>
            </Link>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="sticky top-8">
                        <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                            <Image
                                fill
                                src={book.cover || "/placeholder.svg"}
                                alt={`Cover of ${book.title}`}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="mt-3 space-y-4">
                            <Button asChild className="w-full">
                                <Link href={book.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Visualizar livro
                                </Link>
                            </Button>

                            <Link href="/">
                                <Button variant="outline" className="w-full mt-2">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Visualizar playlists
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                    <p className="text-xl text-muted-foreground mb-2">by {book.author}</p>

                    <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                        <p className="whitespace-pre-line">{book.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}