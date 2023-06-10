import React, { useEffect } from 'react'
import { useState } from 'react'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'
import { useListFeedbackQuery } from '../api/feadback-api-services'

function FeedbackList() {
  const { data, isLoading, refetch } = useListFeedbackQuery('')

  const [items, setItems] = useState(data?.items)
  const [total, setTotal] = useState(data?.total)
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setItems(data?.items)
    setTotal(data?.total)
    setLoading(isLoading)
    refetch()
  }, [data, isLoading, refetch])

  let config: EntityConfiguration = {
    rootUrl: '/feedback',
    title: 'Feedbacks List',
    detailUrl: '/feedback/detail',
    showNewButton: false,
    visibleColumn: [
      { key: 'name', name: 'Name' },
      { key: 'email', name: 'Email' },
      { key: 'phone_number', name: 'Phone Number' },
      { key: 'subject', name: 'Subject' },
      { key: 'created_at', name: 'Register Date', isDate: true },
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

export default FeedbackList
