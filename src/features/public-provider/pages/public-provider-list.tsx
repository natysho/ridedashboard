import React, { useEffect, useState } from 'react'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import { useListPublicProviderQuery } from '../api/public-provider-services'

function PublicProviderList() {
  const { data, isLoading } = useListPublicProviderQuery('')

  const [items, setItems] = useState(data?.items)
  const [total, setTotal] = useState(data?.total)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setItems(data?.items)
    setTotal(data?.total)
    setLoading(isLoading)
  }, [data, isLoading])

  let config: EntityConfiguration = {
    rootUrl: 'public-driver',
    title: 'Drivers List',
    detailUrl: 'public-driver-detail',
    showNewButton: false,
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

export default PublicProviderList
