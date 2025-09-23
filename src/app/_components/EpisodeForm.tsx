'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Episodio from '../model/Episodio';

const episodeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
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
      air_date: new Date().toLocaleDateString(),
      characters: data.characters.split('-').map(s => "https://rickandmortyapi.com/api/character/" + s.trim()),
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
            <label>ID Personajes (separados por guión):</label>
            <input {...register('characters', {
                required: 'Los personajes son requeridos',
                pattern: {
                    value: /^\d+-\d+-\d+-\d+-\d+$/,
                    message: 'Formato inválido. Use guiones para separar los IDs, por ejemplo: 1-2-3-4-5'
                }
            })} className='border ml-2 mr-2' />
            {errors.characters && <p>{errors.characters.message}</p>}
        </div> 
        <button type="submit" className='bg-blue-500 rounded p-1'>Crear Episodio</button>
        </form>
    </div>
  );
}
