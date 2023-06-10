import React, { useEffect } from 'react'
import { useState } from 'react'
import EntityList from 'shared/entity/entity-list'
import { EntityConfiguration } from 'shared/entity/models'

function CreditHistory() {
  const data = [
    {
      date: new Date(),
      type: 'deposit',
      amount: 200,
    },
    {
      date: new Date(),
      type: 'payed',
      amount: 80,
    },
    {
      date: new Date(),
      type: 'payed',
      amount: 30,
    },
  ]

  let config: EntityConfiguration = {
    rootUrl: '/feedback',
    title: 'Transactions',
    hasDetail: false,
    detailUrl: '/feedback/detail',
    showNewButton: false,
    visibleColumn: [
      { key: 'date', name: 'Date', isDate: true },
      { key: 'type', name: 'type' },
      { key: 'amount', name: 'Amount' },
    ],
  }

  const onSearch = (request: any) => {}
  const onPagination = (request: any) => {}
  const onFilter = (request: any) => {}

  return (
    <EntityList
      itemsLoading={false}
      items={data}
      total={3}
      config={config}
      search={onSearch}
      pagination={onPagination}
      filter={onFilter}
    />
  )
}

export default CreditHistory
