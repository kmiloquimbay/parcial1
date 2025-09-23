import Episodio from "../model/Episodio";
import CharactherItem from "./CharacterItem";




export default function EpisodeItem({ episode }: { episode: Episodio }) {

    const slicedCharacters = episode.characters.slice(0, 5);

    return (
        <div>
            <h2 className="text-xl">{episode.name}</h2>
            <p>Fecha episodio: {episode.air_date}</p>
            <h3>Personajes:</h3>
            <div className="flex">
                {slicedCharacters.map((character: string) => (
                    <div key={character} className="m-2">
                        <CharactherItem char={character} />

                    </div>
                ))}
            </div>
        </div>
    );
}