import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOwnerByIdQuery } from '../api/owner-api-service'
import OwnerForm from '../component/owner-form'
import { response } from './mock-data'

function OwnerDetail() {
  const { id } = useParams()
  const { data, isLoading } = useGetOwnerByIdQuery(id ? id : '')
  return (
    <>
      <OwnerForm
        title="User Detail"
        viewMode="detail"
        selectedItem={data?.owner}
        selectedItemLoading={isLoading}
      />
    </>
  )
}

export default OwnerDetail
