import React from 'react'
import { useFetchSWAPI } from '../hooks/useFetchSWAPI'
import Carousel from '../components/Carousel'

export default function Home() {
    const { data: characters } = useFetchSWAPI('people')
    const { data: starships } = useFetchSWAPI('starships')
    const { data: planets } = useFetchSWAPI('planets')

    return (
        <div className="space-y-8">
            <Carousel
                items={characters.map(c => ({ ...c, type: 'characters' }))}
                title="Personajes"
            />
            <Carousel
                items={starships.map(s => ({ ...s, type: 'starships' }))}
                title="Naves"
            />
            <Carousel
                items={planets.map(p => ({ ...p, type: 'planets' }))}
                title="Planetas"
            />
        </div>
    )
}
