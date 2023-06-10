import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPublicVehicleByIdQuery } from '../api/public-vehicle-api-services'
import PublicVehicleDetail from './public-vehicle-detail'

function PublicVehicleLandingPage() {
  const { id } = useParams()
  const { data, isLoading } = useGetPublicVehicleByIdQuery(id ? id : '')

  return (
    <PublicVehicleDetail
      selectedVehicle={data}
      selectedVehicleLoading={isLoading}
    />
  )
}

export default PublicVehicleLandingPage
