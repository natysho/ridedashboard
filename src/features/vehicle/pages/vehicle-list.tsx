import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import {
  useGetVehicleOwnerByIdQuery,
  useListVehicleQuery,
} from '../api/vehicle-api-service'

function VehicleList() {
  const { id } = useParams()
  // const { data, isLoading } = useListVehicleQuery('')
  const { data, isLoading } = useGetVehicleOwnerByIdQuery(id ? id : '')
  const [items, setItems] = useState(data?.owner?.vehicles)
  const [total, setTotal] = useState(data?.owner?.vehicles?.length)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setItems(data?.owner?.vehicles)
    setTotal(data?.owner?.vehicles?.length)
    setLoading(isLoading)
  }, [data, isLoading])

  let config: EntityConfiguration = {
    rootUrl: 'vehicle',
    title: 'Vehicle List',
    detailUrl: 'vehicle/detail',
    showNewButton: true,
    visibleColumn: [
      { key: 'model', name: 'Model' },
      { key: 'code', name: 'Code' },
      { key: 'plate_number', name: 'Plate Number' },
      { key: 'vehicle_category', name: 'Category' },
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

export default VehicleList
