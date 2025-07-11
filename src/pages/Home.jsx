import React from 'react'
import { useFetchSWAPI } from '../hooks/useFetchSWAPI'
import SWCarousel from '../components/Carousel'

export default function Home() {
  const { data: characters } = useFetchSWAPI('people')
  const { data: vehicles } = useFetchSWAPI('vehicles')
  const { data: planets } = useFetchSWAPI('planets')

  return (
    <>
      <SWCarousel
        items={characters.map(c => ({ ...c, type: 'characters' }))}
        title="Personajes"
      />
      <SWCarousel
        items={vehicles.map(v => ({ ...v, type: 'vehicles' }))}
        title="Vehículos"
      />
      <SWCarousel
        items={planets.map(p => ({ ...p, type: 'planets' }))}
        title="Planetas"
      />
    </>
  )
}
