import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import { useListVehicleOwnerQuery } from '../api/vehicle-api-service'

function VehicleOwnerList() {
  const { data, isLoading } = useListVehicleOwnerQuery('')

  const [items, setItems] = useState(data?.items)
  const [total, setTotal] = useState(data?.total)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setItems(data?.items)
    setTotal(data?.total)
    setLoading(isLoading)
  }, [data, isLoading])
  let config: EntityConfiguration = {
    rootUrl: '/vehicle',
    title: 'Owner List',
    detailUrl: '/vehicle/owner-detail',
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
    <>
      <EntityList
        itemsLoading={loading}
        items={items}
        total={total}
        config={config}
        search={onSearch}
        pagination={onPagination}
        filter={onFilter}
      />
    </>
  )
}

export default VehicleOwnerList
