import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetVehicleByIdQuery } from '../api/vehicle-api-service'
import DocumentFrom from '../component/document-form'
import VehicleForm from '../component/vehicle-form'

function VehicleDetail() {
  const { id } = useParams()
  const { data, isLoading } = useGetVehicleByIdQuery(id ? id : '')
  return (
    <>
      <VehicleForm
        viewMode="detail"
        title="Vehicle Detail"
        selectedItem={data?.vehicle}
        selectedItemLoading={isLoading}
      />
      <DocumentFrom />
    </>
  )
}

export default VehicleDetail
