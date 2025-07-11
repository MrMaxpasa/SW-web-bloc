// src/pages/Home.jsx
import React from 'react'
import { useFetchSWAPI } from '../hooks/useFetchSWAPI'
import SWCarousel from '../components/Carousel'

export default function Home() {
  const { data: characters } = useFetchSWAPI('people')
  const { data: starships } = useFetchSWAPI('starships')
  const { data: planets } = useFetchSWAPI('planets')

  return (
    <>
      <SWCarousel
        items={characters.map(c => ({ ...c, type: 'characters' }))}
        title="Personajes"
      />
      <SWCarousel
        items={starships.map(s => ({ ...s, type: 'starships' }))}
        title="Naves"
      />
      <SWCarousel
        items={planets.map(p => ({ ...p, type: 'planets' }))}
        title="Planetas"
      />
    </>
  )
}
