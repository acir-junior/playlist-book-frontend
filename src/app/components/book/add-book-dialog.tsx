import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "@/models/book.model";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateBook, createBookSchema } from "./schema/create-book.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const availableBooks: Book[] = [
    {
        id: "1",
        title: "Anjos e Demônios",
        url: "http://books.google.com.br/books?id=CKqGEAAAQBAJ&printsec=frontcover&dq=dem%C3%B4nios&hl=&cd=4&source=gbs_api",
        cover: "http://books.google.com/books/content?id=CKqGEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        author: "Benny Hinn",
        description: "Neste livro, repletos de fatos, você deparará com duas forças que mais operam no mundo: anjos e demônios. Não são frutos de nossa imaginação, mas são reais neste exato momento. Uma jornada inesquecível no mundo espiritual do bem e do mal. Neste livro, repletos de fatos, você deparará com duas forças que mais operam no mundo: anjos e demônios. Não são frutos de nossa imaginação, mas são reais neste exato momento. Você descobrirá: Sete fatos específicos que precisa saber sobre os seres angelicais; A forma e função dos serafins e querubins; O mundo dos zoa — \"seres viventes\"; A missão dos anjos hoje; A evidência bíblica de que os anjos eram pais dos gigantes do Antigo Testamento; Os sete métodos tortuosos usados pelos demônios para ter entrada na vida de uma pessoa; Os doze espíritos demoníacos do \"homem forte\" mencionados na Bíblia — e como vencêlos; O papel dos anjos e demônios no fim dos tempos. Benny Hinn afirma: \"Estou empolgado por você ter escolhido ler este livro. Ele é o resultado de mais de trinta anos de estudo sobre esse assunto e, para mim, foi transformador de vida. Creio que você também será transformado\"."
    },
    {
        id: "2",
        title: "Caçadores de demônios",
        url: "http://books.google.com.br/books?id=3uyOBgAAQBAJ&printsec=frontcover&dq=dem%C3%B4nios&hl=&cd=5&source=gbs_api",
        cover: "http://books.google.com/books/content?id=3uyOBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        author: "Ademir Pascale",
        description: "“A arte de contar uma história envolvente, que muitos deixam de lado em prol de pirotecnias linguísticas, é algo que Ademir Pascale cultiva com destreza. Caçadores de Demônios é uma dessas narrativas das quais é impossível escapar ileso.” – Ronize Aline, escritora e crítica literária do jornal O Globo do Rio de Janeiro (suplemento literário Prosa&Verso)Quando o mal decide pelo extermínio da humanidade, desconfie de tudo e de todos.Uma vingança ancestral cairá sobre a Terra quando o mais ardiloso entre todos os demônios for libertado de sua prisão.Rafael Monte Cerquillo lutará contra as criaturas da noite em uma aventura alucinante pelas ruas, avenidas e bares de uma São Paulo dominada pelas trevas. Mas não estará sozinho nessa caçada. Com a ajuda de dois poderosos guerreiros, ele sabe que deve prevalecer, custe o que custar.Caçadores de Demônios é um romance de Ademir Pascale que se passa no mesmo universo de O desejo de Lilith. Acompanhe a trajetória desses heróis e esteja sempre atento, pois nada acontece por acaso. Desvende os mistérios do mundo e prepare-se para uma verdadeira corrida para impedir que o mal triunfe. Tome cuidado, no entanto: eles estão por toda parte."
    },
    {
        id: "3",
        title: "Anjos e demônios",
        url: "http://books.google.com.br/books?id=40FOFEUszJcC&printsec=frontcover&dq=dem%C3%B4nios&hl=&cd=10&source=gbs_api",
        cover: "http://books.google.com/books/content?id=40FOFEUszJcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        author: "Dan Brown",
        description: "A PRIMEIRA AVENTURA DE ROBERT LANGDON Antes de decifrar O Código Da Vinci, Robert Langdon, o famoso professor de simbologia de Harvard, vive sua primeira aventura em Anjos e demônios, quando tenta impedir que uma antiga sociedade secreta destrua a Cidade do Vaticano. Às vésperas do conclave que vai eleger o novo Papa, Langdon é chamado às pressas para analisar um misterioso símbolo marcado a fogo no peito de um físico assassinado em um grande centro de pesquisas na Suíça. Ele descobre indícios de algo inimaginável: a assinatura macabra no corpo da vítima é dos Illuminati, uma poderosa fraternidade que ressurgiu disposta a levar a cabo a lendária vingança contra a Igreja Católica. De posse de uma nova arma devastadora, roubada do centro de pesquisas, ela ameaça explodir a Cidade do Vaticano e matar os quatro cardeais mais cotados para a sucessão papal. A antiga sociedade ressurgiu disposta a levar a cabo a lendária vingança contra a Igreja Católica, seu inimigo mais odiado. De posse de uma nova arma devastadora, roubada do centro de pesquisas, ela ameaça explodir a Cidade do Vaticano e matar os quatro cardeais mais cotados para a sucessão papal. Correndo contra o tempo, Langdon voa para Roma junto com Vittoria Vetra, uma bela cientista italiana. Numa caçada frenética por criptas, igrejas e catedrais, os dois desvendam enigmas e seguem uma trilha que pode levar ao covil dos Illuminati - um refúgio secreto onde está a única esperança de salvação da Igreja nesta guerra entre ciência e religião. Em Anjos e Demônios, Dan Brown demonstra novamente sua habilidade de entremear suspense com fascinantes informações sobre ciência, religião e história da arte."
    }
]

interface AddBookDialogProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onAddBook: (book: Book) => void;
    existingBookIds: string[];
};

export function AddBookDialog({ open, onOpenChange, onAddBook, existingBookIds }: AddBookDialogProps) {
    const {
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateBook>({
        resolver: zodResolver(createBookSchema),
    })

    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"search" | "add">("search");

    const [newBook, setNewBook] = useState<Omit<Book, "id">>({
        title: "",
        url: "",
        cover: "",
        author: "",
        description: "",
    });

    const filteredBooks = availableBooks.filter((book) => !existingBookIds.includes(book.id ?? ''));
    const searchResults = filteredBooks.filter(
        (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function handleAddExistingBook(book: Book) {
        onAddBook(book);
        onOpenChange(false);
    }

    function handleCreateBook() {
        const book: Book = {
            ...newBook,
        }

        onAddBook(book);
        onOpenChange(false);
        reset();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Adicionar livro a uma Playlist</DialogTitle>
                    <DialogDescription>Pesquise um livro ou crie um novo para adicionar a uma playlist.</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'search' | 'add')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="search">Pesquisar livros</TabsTrigger>
                        <TabsTrigger value="add">Criar novo livro</TabsTrigger>
                    </TabsList>

                    <TabsContent value="search" className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Pesquisa por titulo pu autor..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="h-[300px] overflow-y-auto border rounded-md p-2">
                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {searchResults.map((book) => (
                                        <div
                                            key={book.id}
                                            className="flex items-center gap-3 p-2 border rounded-md hover:bg-accent cursor-pointer"
                                            onClick={() => handleAddExistingBook(book)}
                                        >
                                            <Image
                                                src={book.cover || "/placeholder.svg"}
                                                alt={`Cover of ${book.title}`}
                                                className="w-12 h-16 object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{book.title}</p>
                                                <p className="text-sm text-muted-foreground truncate">{book.author}</p>
                                                <p className="text-xs text-muted-foreground">{book.description}</p>
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
                    </TabsContent>

                    <TabsContent value="create">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={newBook.title}
                                    {  ...register("title") }
                                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                    placeholder="Titulo do livro"
                                />
                                {  errors.title && <p className="text-sm text-red-500">{errors.title.message}</p> }
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="author">Autor</Label>
                                <Input
                                    id="author"
                                    value={newBook.author}
                                    {  ...register("author") }
                                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                    placeholder="Nome do autor"
                                />
                                {  errors.author && <p className="text-sm text-red-500">{errors.author.message}</p> }
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="url">URL do livro</Label>
                                <Input
                                    id="url"
                                    type="text"
                                    value={newBook.url}
                                    {  ...register("url") }
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, url: e.target.value })
                                    }
                                    placeholder="Descrição do livro"
                                />
                                {  errors.url && <p className="text-sm text-red-500">{errors.url.message}</p> }
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    id="description"
                                    value={newBook.description}
                                    {  ...register("description") }
                                    onChange={(e) =>
                                        setNewBook({ ...newBook, description: e.target.value })
                                    }
                                    placeholder="Descrição do livro"
                                />
                                {  errors.description && <p className="text-sm text-red-500">{errors.description.message}</p> }
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateBook} disabled={isSubmitting}>
                                Adicionar livro
                            </Button>
                        </DialogFooter>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
