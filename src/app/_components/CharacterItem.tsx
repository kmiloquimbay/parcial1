import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Character {
    name: string
    image: string
}

interface Props {
    char: string
}

export default function CharactherItem({char}: Props) {
    
    const [character, setCharacter] = useState<Character>()

    useEffect(() => {
        const getPersonaje = async (link: string) => {
            const response = await fetch(link)
            const data = await response.json()
            console.log(data)


            const personaje: Character = {
                name: data.name,
                image: data.image
            }

            setCharacter(personaje)
        }
        getPersonaje(char)
    }, [char])

    

    return(
        <div>
            {character && <Image src={character.image} alt={character.name} width={100} height={100} />}
            <label>{character?.name}</label>
        </div>
    )
}