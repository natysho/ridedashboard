import { GeoFire } from 'geofire'
import { useEffect, useState } from 'react'
import { firebaseConfig } from './firbase'
import { firebase } from './firbase'

function GeoFireDatabaseQuery(coordinates) {
  var db = firebase.database().ref('places')
  const geoFire = new GeoFire(db)
  const [data, setData] = useState<any[]>([])
  const [lat, setLat] = useState<number>(8.9831138)
  const [lng, setLng] = useState<number>(38.8100855)

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
        geoFire
          .set('saries', [8.957506799999999, 38.7647244])
          .then(() => {
            getProvidersAround()
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  }

  const getCurrentUserLocation = async () => {
    const geoQuery = geoFire.query({
      center: [lat, lng],
      radius: 10, //KM
    })
    geoQuery.on('key_entered', (key, location, distance) => {
      console.log(
        'key = ',
        key,
        'location = ',
        location,
        'distance = ',
        distance,
      )
    })
  }
  const getProvidersAround = () => {
    geoFire
      .query({
        center: [lat, lng],
        radius: 2000,
      })
      .on('key_entered', (key, location, distance) => {
        firebase
          .database()
          .ref('pleaces' + key)
          .once('value', (snap) => {
            console.log(snap.val(), { location: location, distance: distance })
          })
      })
  }
  useEffect(() => {
    getCurrentUserLocation()
    // getUserLocation()
  }, [])

  return <div>{data}</div>
}

export default GeoFireDatabaseQuery
