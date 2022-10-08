import React, { Fragment, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ReactTable from '@/components/ReactTable'
import { ApiUrl, RouteUrl } from '@/constants'
import { useQuery } from 'react-hooks-axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Filter from '@/components/Filter'

const ListOrder = () => {
  const [orders, setOrders] = useState<any[]>([])

  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [rows, setRows] = useState(searchParams.get('rows') || '1000')

  const { queryCallback } = useQuery()
  const [queryOrders, { loading }] = queryCallback()

  const navigate = useNavigate()

  useEffect(() => {
    const query = `?search=${search}&rows=${rows}`
    navigate(RouteUrl.LIST_ORDER + query)
    queryOrders({
      url: ApiUrl.Order.LIST_ORDER + query,
      onCompleted(data) {
        setOrders(data?.orders || [])
      }
    })
  }, [search, rows])

  console.log(orders)

  return (
    <Layout>
      <Filter
        onSetSearch={(val: string) => setSearch(val)}
        onSetRows={(val: string) => setRows(val)}
      />
      {loading && <Skeleton count={10} />}
      {!loading && (
        <Fragment>
          <ReactTable data={orders} coloumn="order" />
        </Fragment>
      )}
    </Layout>
  )
}

export default ListOrder
