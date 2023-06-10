import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetByIdUserQuery } from '../api/user-api-services'
import UserForm from '../component/user-Form'

function UserDetail() {
  const { id } = useParams()
  const { data, isLoading } = useGetByIdUserQuery(id ? id : '')
  return (
    <UserForm
      selectedItemLoading={isLoading}
      viewMode="detail"
      title="User Detail"
      selectedItem={data?.user}
    />
  )
}

export default UserDetail
