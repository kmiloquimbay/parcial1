import Episodio from "../model/Episodio";
import EpisodeItem from "./EpisodeItem";

interface Props {
    favorites: Episodio[]
    onRemoveFromFavorites: (episodeId: number) => void
}

export default function FavoritesList({ favorites, onRemoveFromFavorites }: Props) {
    return (
        <div>
            {favorites.map((episode) => (
                <div key={episode.id} className="border p-4 m-4">
                    <EpisodeItem episode={episode} />
                    <button 
                        onClick={() => onRemoveFromFavorites(episode.id)} 
                        className="bg-red-500 rounded p-1"
                    >
                        Quitar de favoritos
                    </button>
                </div>
            ))}
        </div>
    );
}