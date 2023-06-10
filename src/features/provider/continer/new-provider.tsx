import React from 'react'
import { useParams } from 'react-router-dom'
import ProviderForm from '../component/provider-form'

function NewProvider() {
  const { id } = useParams()
  return (
    <ProviderForm vehicleId={id} title="Register New Provider" viewMode="new" />
  )
}

export default NewProvider
