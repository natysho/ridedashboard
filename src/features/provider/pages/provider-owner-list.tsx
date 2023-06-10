import React, { useEffect, useState } from 'react'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import { useListVehicleOwnerProviderQuery } from '../api/provider-api-services'

function ProviderOwnerList() {
  const { data, isLoading } = useListVehicleOwnerProviderQuery('')

  const [items, setItems] = useState(data?.items)
  const [total, setTotal] = useState(data?.total)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setItems(data?.items)
    setTotal(data?.total)
    setLoading(isLoading)
  }, [data, isLoading])

  let config: EntityConfiguration = {
    rootUrl: '/provider',
    title: 'Owners List',
    detailUrl: 'owner-detail',
    showNewButton: false,
    visibleColumn: [
      { key: 'first_name', name: 'First Name' },
      { key: 'last_name', name: 'Last Name' },
      { key: 'email', name: 'Email' },
      { key: 'phone_number', name: 'Phone Number' },
      { key: 'gender', name: 'Gender' },
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

export default ProviderOwnerList
