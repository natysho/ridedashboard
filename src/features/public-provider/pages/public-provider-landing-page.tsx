import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPublicProviderByIdQuery } from '../api/public-provider-services'
import PublicProviderDetail from './public-provider-detail'

function PublicProviderLandingPage() {
  const { id } = useParams()
  const { data, isLoading } = useGetPublicProviderByIdQuery(id ? id : '')

  return (
    <PublicProviderDetail
      selectedProvider={data?.driver}
      selectedProviderLoading={isLoading}
    />
  )
}

export default PublicProviderLandingPage
