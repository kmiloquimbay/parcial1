import Episodio from "../model/Episodio"
import EpisodeItem from "./EpisodeItem";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


interface Props {
    episodios: Episodio[]
    favorites: Episodio[]
    onAddToFavorites: (episode: Episodio) => void
}

export default function EpisodeList({episodios, favorites, onAddToFavorites}: Props) {

    const markAsFavorite = (episode: Episodio) => {
        const isAlreadyFavorite = favorites.find(fav => fav.id === episode.id);
        if (isAlreadyFavorite) {
            toast(`Episodio "${episode.name}" ya está en favoritos!`);
        } else { 
            onAddToFavorites(episode);
            toast(`Episodio "${episode.name}" marcado como favorito!`);
        }
    }

    return (
        <div>
            <Toaster />
            {episodios.map((ep) => (
                <div key={ep.id} className="border p-4 m-4">
                    <EpisodeItem episode={ep} />
                    <button 
                        onClick={() => markAsFavorite(ep)} 
                        className={'bg-' + (favorites.find(fav => fav.id === ep.id) ? 'gray-500 text-white' : 'yellow-500') + ' rounded p-1'}
                        disabled={favorites.find(fav => fav.id === ep.id) !== undefined}
                    >
                        {favorites.find(fav => fav.id === ep.id) ? 'Ya es favorito' : 'Marcar como favorito'}
                    </button>
                </div>
            ))}
        </div>
    );
}