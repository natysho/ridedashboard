import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer,
  DirectionsRenderer,
  Data,
  useGoogleMap,
} from '@react-google-maps/api'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Distance from './distance'
import { firebaseConfig } from './firbase'
import './globals.css'
import Places from './places'

import { firebase } from './firbase'
import StartingPoint from './starting-point'
import Destination from './destination'
import { Button, Card } from 'react-bootstrap'
import { IconCaretLeft, IconMenu2, IconSquareX } from '@tabler/icons'
import axios from 'axios'
import { GeoFire } from 'geofire'
type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions

type CalculatedParams = {
  distance: { text: string; value: number }
  duration: {
    text: string
    value: number
  }
  position: { lat: number; lng: number }
}
function Map() {
  const mapRef = useRef<GoogleMap>()
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 8.9806, lng: 38.7578 }),
    [],
  )
  const option = useMemo<MapOptions>(
    () => ({
      mapId: 'e1fc1729f1b5dcb0',
      disableDefaultUI: false,
      clickableIcons: false,
    }),
    [],
  )

  const onLoad = useCallback((map) => (mapRef.current = map), [])
  const houses = useMemo(() => generateHouses(center), [center])
  const [startingPoint, setStartingPoint] = useState<LatLngLiteral>()
  const [destination, setDestination] = useState<LatLngLiteral>()
  const [direction, setDirection] = useState<DirectionsResult>()
  const [showSearch, setShowSearch] = useState(false)
  const [places, setPlaces] = useState<LatLngLiteral[]>([])
  const [calculatedPlacesDistance, setCalculatedPlacesDistance] = useState<
    CalculatedParams[]
  >([])

  // const fetch = async () => {
  //   var db = firebase.database().ref('pleaces')

  //   let placeList: LatLngLiteral[] = []
  //   var db2 = await firebase
  //     .firestore()
  //     .collection('places')
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.docs.forEach((doc) => {
  //         const data = {
  //           lat: doc.data().lat,
  //           lng: doc.data().lng,
  //         }
  //         placeList.push(data)
  //       })
  //     })
  //   setPlaces(placeList)
  //   // db.on('value', (snapshot) => {
  //   //   console.log(snapshot)

  //   //   // setPlaces([{lat:snapshot.val().lat,lng:snapshot.val().lng}])
  //   // })
  // }

  const getProviderAround = async () => {
    if (startingPoint) {
      var db = firebase.database().ref('places')
      const geoFire = new GeoFire(db)
      const geoQuery = geoFire.query({
        center: [startingPoint.lat, startingPoint.lng],
        radius: 200, //KM
      })

      await geoQuery.on('key_entered', (key, location, distance) => {
        console.log(
          'key..',
          key,
          'location..',
          location,
          'distance..',
          distance,
        )
        setPlaces((prev) => [...prev, { lat: location[0], lng: location[1] }])
      })
    }
  }

  useEffect(() => {
    if (startingPoint && destination) {
      const service = new google.maps.DirectionsService()
      service.route(
        {
          origin: startingPoint,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            console.log(result)

            setDirection(result)
            getProviderAround()
            calculateDistance()
          }
        },
      )
    }
  }, [startingPoint, destination])

  const onCloseSearch = () => {
    setShowSearch(!showSearch)
  }

  const booking = () => {
    if (
      places &&
      calculatedPlacesDistance.length &&
      startingPoint &&
      destination
    ) {
      let numberOfRequest = 0
      calculatedPlacesDistance.forEach((element) => {
        if (numberOfRequest < 3) {
          numberOfRequest++
          const response = order(element)

          if (response === 'error') {
            booking()
          }
        } else {
          throw alert('Not found nearest provider')
        }
      })
    }
  }

  const order = (element): any => {
    axios.get('https://').then(
      (response) => {
        return response.data
      },
      (error) => {
        return 'error'
      },
    )
  }
  const calculateDistance = () => {
    if (places && startingPoint) {
      places.forEach(async (endPoint) => {
        const result = (await onCalculate(
          startingPoint,
          endPoint,
        )) as DirectionsResult

        if (result) {
          let data: CalculatedParams = {
            distance: result.routes[0].legs[0].distance!,
            duration: result.routes[0].legs[0].duration!,
            position: endPoint,
          }
          setCalculatedPlacesDistance((prev) => [...prev, data])
        }
      })
    }

    if (calculatedPlacesDistance) {
      calculatedPlacesDistance.sort(
        (a, b) => a.distance.value - b.distance.value,
      )
    }
  }
  const onCalculate = async (starPoint, endPoint): Promise<any> => {
    let response
    if (starPoint && endPoint) {
      const service = new google.maps.DirectionsService()
      await service.route(
        {
          origin: starPoint,
          destination: endPoint,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            response = result
          }
        },
      )
    }
    return response
  }
  return (
    <div className="d-flex">
      <div className={showSearch ? 'bg-white w-25 p-2 m-2' : 'd-none'}>
        <div
          onClick={onCloseSearch}
          style={{ float: 'right', cursor: 'pointer' }}
          className="mb-2"
        >
          <IconSquareX style={{ width: '30', height: '30' }} />
        </div>

        <StartingPoint
          startingPoint={(start: LatLngLiteral) => setStartingPoint(start)}
        />

        <Destination
          destination={(start: LatLngLiteral) => setDestination(start)}
        />

        {direction && (
          <Distance leg={direction.routes[0].legs[0]} booking={booking} />
        )}
      </div>

      <div className={showSearch ? 'w-75' : 'w-100'}>
        {!showSearch && (
          <div style={{ float: 'right', marginTop: -15, marginBottom: 2 }}>
            <Button size="sm" onClick={onCloseSearch}>
              <IconMenu2 />
            </Button>
          </div>
        )}
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          onLoad={onLoad}
          options={option}
        >
          {direction && <DirectionsRenderer directions={direction} />}
          {startingPoint && destination && (
            <>
              <Marker
                // icon={{
                //   path:
                //     'M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z',
                //   fillColor: 'yellow',
                //   fillOpacity: 0.9,
                //   scale: 2,
                //   strokeColor: 'gold',
                //   strokeWeight: 2,
                // }}
                position={startingPoint!}
              />
              <MarkerClusterer>
                {(cluster) =>
                  places.map((p) => (
                    <Marker
                      animation={google.maps.Animation.DROP}
                      key={p.lat}
                      position={p}
                      clusterer={cluster}
                      // onClick={() => {
                      //   fetchDirections(place)
                      // }}
                    />
                  ))
                }
              </MarkerClusterer>

              <Circle
                center={startingPoint}
                radius={1500}
                options={closeOptions}
              />
              <Circle
                center={startingPoint}
                radius={3000}
                options={middleOptions}
              />
              <Circle
                center={startingPoint}
                radius={6000}
                options={farOptions}
              />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}

export default Map

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
}
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
}
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
}
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
}

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = []
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    })
  }
  return _houses
}
