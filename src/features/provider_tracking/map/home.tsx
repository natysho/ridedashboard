import { useLoadScript } from '@react-google-maps/api'
import React from 'react'
import Map from './map'
import GeoFireDatabaseQuery from './test'

function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBzM9L7ieL0qT8gZEKLEnMyIiiA8dV1NbE',
    libraries: ['places'],
  })
  if (!isLoaded) return <div>Lading.....</div>
  return <Map />

  // return (
  //   <div>
  //     <h1>GeoFire</h1>
  //     <GeoFireDatabaseQuery />
  //   </div>
  // )
}

export default Home
