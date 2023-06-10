import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EntityList from '../../../shared/entity/entity-list'
import { EntityConfiguration } from '../../../shared/entity/models'
import { useGetVehicleProviderByIdQuery } from '../api/provider-api-services'

function ProviderList() {
  const { id } = useParams()
  const { data, isLoading } = useGetVehicleProviderByIdQuery(id ? id : '')

  const [items, setItems] = useState(data?.vehicle?.drivers)
  const [total, setTotal] = useState(data?.vehicle?.drivers.length)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setItems(data?.vehicle?.drivers)
    setTotal(data?.vehicle?.drivers.length)
    setLoading(isLoading)
  }, [data, isLoading])

  let config: EntityConfiguration = {
    rootUrl: 'driver',
    title: 'Drivers List',
    detailUrl: 'driver-detail',
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

  const onSearch = (event: any) => {}
  const onPagination = (data: any) => {}
  const onFilter = (data: any) => {}
  return (
    <div>
      <EntityList
        itemsLoading={loading}
        pagination={onPagination}
        search={onSearch}
        items={items}
        config={config}
        total={total}
        filter={onFilter}
      />
    </div>
  )
}

export default ProviderList
