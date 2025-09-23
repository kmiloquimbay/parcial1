'use client'

import { useEffect, useState } from "react";
import Episodio from "./model/Episodio";
import EpisodeList from "./_components/EpisodeList";
import FavoritesList from "./_components/FavoritesList";
import EpisodeForm from "./_components/EpisodeForm";
import { toast, Toaster } from "sonner";

export default function Home() {

  const [episodes, setEpisodes] = useState<Episodio[]>([]);
  const [favorites, setFavorites] = useState<Episodio[]>([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/episode");
      const data = await response.json();
      setEpisodes(data.results);
    };
    getEpisodes();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) { 
      setFavorites(JSON.parse(saved))
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (episode: Episodio) => {

    if (!favorites.find(fav => fav.id === episode.id)) {
      setFavorites([...favorites, episode]);
    }
  };

  const removeFromFavorites = (episodeId: number) => {
    setFavorites(favorites.filter(fav => fav.id !== episodeId));
    toast(`Episodio ${episodeId} removido de favoritos!`)
  };

  const addEpisode = (episode: Episodio) => {
    setEpisodes([...episodes, episode]);
  };

  return (
    <div>

      < Toaster />
      
      <div className="grid grid-cols-2">
        <div>
          <h2>Episodes</h2>
          <EpisodeList 
            episodios={episodes} 
            favorites={favorites}
            onAddToFavorites={addToFavorites}
          />
        </div>
        
        <div>
          <div>
            <h2>Crear Episodio</h2>
            <div className="border p-4 m-4">
              <EpisodeForm onAddEpisode={addEpisode}/>
            </div>
          </div>
          <h2>Favoritos</h2>
          <FavoritesList 
            favorites={favorites}
            onRemoveFromFavorites={removeFromFavorites}
          />
        </div>
      </div>
    </div>
    );
}
