import React from 'react'
import { useParams, useRoutes } from 'react-router-dom'
import VehicleFrom from '../component/vehicle-form'
import { BrowserRouter } from 'react-router-dom'
function NewVehicle() {
  const { id } = useParams()
  return (
    <VehicleFrom ownerId={id} viewMode="new" title="Register new Vehicle" />
  )
}

export default NewVehicle
