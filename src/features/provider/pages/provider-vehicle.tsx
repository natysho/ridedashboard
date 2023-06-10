import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import { useGetVehicleOwnerProviderByIdQuery } from '../api/provider-api-services'

function ProviderVehicle() {
  const { id } = useParams()
  const { data, isLoading } = useGetVehicleOwnerProviderByIdQuery(id ? id : '')

  const [items, setItems] = useState(data?.owner?.vehicles)
  const [total, setTotal] = useState(data?.owner?.vehicles?.length)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setItems(data?.owner?.vehicles)
    setTotal(data?.owner?.vehicles?.length)
    setLoading(isLoading)
  }, [data, isLoading])

  let config: EntityConfiguration = {
    rootUrl: '/provider',
    title: 'Vehicles List',
    detailUrl: 'vehicle-detail',
    showNewButton: false,
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

export default ProviderVehicle
