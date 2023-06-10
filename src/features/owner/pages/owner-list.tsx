import React, { useEffect } from 'react'
import { useState } from 'react'
import { userService } from 'services/auth/user-services'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import { useListOwnerQuery } from '../api/owner-api-service'

function OwnerList() {
  const { data, isLoading } = useListOwnerQuery('')

  const [items, setItems] = useState(data?.items)
  const [total, setTotal] = useState(data?.total)
  const [loading, setLoading] = useState(isLoading)
  const d = userService.getCurrentUserRoles

  useEffect(() => {
    setItems(data?.items)
    setTotal(data?.total)
    setLoading(isLoading)
  }, [data, isLoading])

  let config: EntityConfiguration = {
    rootUrl: '/owner',
    title: 'Owners List',
    detailUrl: '/owner/detail',
    visibleColumn: [
      { key: 'first_name', name: 'First Name' },
      { key: 'last_name', name: 'Last Name' },
      { key: 'email', name: 'Email' },
      { key: 'phone_number', name: 'Phone Number' },
      { key: 'gender', name: 'Gender' },
      { key: 'created_by', name: 'Registered By', isDate: true },
      { key: 'created_at', name: 'Register Date', isDate: true },
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
      itemsLoading={loading}
      items={items}
      total={total}
      config={config}
      search={onSearch}
      pagination={onPagination}
      filter={onFilter}
    />
  )
}

export default OwnerList
