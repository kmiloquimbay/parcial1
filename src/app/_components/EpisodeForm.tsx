'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Episodio from '../model/Episodio';

const episodeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  air_date: z.string().min(1, 'La fecha de emisión es requerida'),
  episode: z.string().min(1, 'El código del episodio es requerido'),
  characters: z.string().min(1, 'Los personajes son requeridos'),
});

type EpisodeFormData = z.infer<typeof episodeSchema>;

interface Props {
  onAddEpisode: (episode: Episodio) => void;
}

export default function EpisodeForm({ onAddEpisode }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeSchema),
  });

  const onSubmit = (data: EpisodeFormData) => {
    const newEpisode: Episodio = {
      id: Date.now(),
      name: data.name,
      air_date: data.air_date,
      episode: data.episode,
      characters: data.characters.split(',').map(s => "https://rickandmortyapi.com/api/character/" + s.trim()),
    };
    onAddEpisode(newEpisode);
    reset();
  };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Nombre del episodio:</label>
            <input {...register('name')} className='border ml-2 mr-2' />
            {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
            <label>Fecha de emisión:</label>
            <input {...register('air_date')} className='border ml-2 mr-2' />
            {errors.air_date && <p>{errors.air_date.message}</p>}
        </div>
        <div>
            <label>Código del episodio (SXXEXX):</label>
            <input {...register('episode')} className='border ml-2 mr-2' />
            {errors.episode && <p>{errors.episode.message}</p>}
        </div>
        <div>
            <label>ID Personajes (separados por coma):</label>
            <input {...register('characters')} className='border ml-2 mr-2' />
            {errors.characters && <p>{errors.characters.message}</p>}
        </div>
        <button type="submit" className='bg-blue-500 rounded p-1'>Crear Episodio</button>
        </form>
    </div>
  );
}
