import { Header } from "./components/Header";
import { Playlists } from "./components/playlist/playlits";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Playlists de livros</h1>
        <Playlists />
      </main>
    </div>
  );
}
