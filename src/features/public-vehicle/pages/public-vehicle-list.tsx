import React, { useEffect, useState } from 'react'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import { useListPublicVehicleQuery } from '../api/public-vehicle-api-services'

function PublicVehicleList() {
  const { data, isLoading } = useListPublicVehicleQuery('')
  const [items, setItems] = useState(data?.items)
  const [total, setTotal] = useState(data?.total)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setItems(data?.items)
    setTotal(data?.total)
    setLoading(isLoading)
  }, [data, isLoading])

  let config: EntityConfiguration = {
    rootUrl: 'public-vehicle',
    title: 'Vehicle List',
    detailUrl: 'public-vehicle-detail',
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

export default PublicVehicleList
