import React from 'react'
import { useParams } from 'react-router-dom'
import ProviderForm from '../component/provider-form'
import DocumentFrom from '../component/document-from'
import { useGetProviderByIdQuery } from '../api/provider-api-services'
function ProviderDetail() {
  const { id } = useParams()
  const { data, isLoading } = useGetProviderByIdQuery(id ? id : '')
  return (
    <>
      <ProviderForm
        title="Provider Detail"
        viewMode="detail"
        selectedItem={data?.driver}
        selectedItemLoading={isLoading}
      />

      <DocumentFrom provider={data?.driver} />
    </>
  )
}

export default ProviderDetail
