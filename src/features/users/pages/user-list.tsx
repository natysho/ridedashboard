import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import { useListUserQuery } from '../api/user-api-services'

function UserList() {
  const { data, isLoading } = useListUserQuery('')

  const [items, setItems] = useState(data?.items)
  const [total, setTotal] = useState(data?.total)
  useEffect(() => {
    setItems(data?.items)
    setTotal(data?.total)
  }, [data])

  let config: EntityConfiguration = {
    rootUrl: '/users',
    title: 'User List',
    showNewButton: true,
    visibleColumn: [
      { key: 'first_name', name: 'First Name' },
      { key: 'last_name', name: 'Last Name' },
      { key: 'email', name: 'Email' },
      { key: 'phone_number', name: 'Phone Number' },
    ],
    filter: [
      { field: 'status', value: 'active', name: 'Active' },
      { field: 'status', value: 'inActive', name: 'InActive' },
      { field: 'status', value: 'lock', name: 'Lock' },
    ],
  }

  const onSearch = (request: any) => {}
  const onPagination = (request: any) => {}
  const onFilter = (request: any) => {}

  return (
    <EntityList
      items={items}
      total={total}
      itemsLoading={isLoading}
      config={config}
      search={onSearch}
      pagination={onPagination}
      filter={onFilter}
    />
  )
}

export default UserList
