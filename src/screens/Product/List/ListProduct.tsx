import React, { Fragment, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ReactTable from '@/components/ReactTable'
import { ApiUrl, RouteUrl } from '@/constants'
import { useQuery } from 'react-hooks-axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Filter from '@/components/Filter'

const ListProduct = () => {
  const [products, setProducts] = useState<any[]>([])

  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [rows, setRows] = useState(searchParams.get('rows') || '1000')

  const { queryCallback } = useQuery()
  const [queryProducts, { loading }] = queryCallback()

  const navigate = useNavigate()

  useEffect(() => {
    const query = `?search=${search}&rows=${rows}`
    navigate(RouteUrl.LIST_PRODUCT + query)
    queryProducts({
      url: ApiUrl.Product.LIST_PRODUCT + query,
      onCompleted(data) {
        setProducts(data?.products || [])
      }
    })
  }, [search, rows])

  return (
    <Layout>
      <Filter
        onSetSearch={(val: string) => setSearch(val)}
        onSetRows={(val: string) => setRows(val)}
      />
      {loading && <Skeleton count={10} />}
      {!loading && (
        <Fragment>
          <ReactTable data={products} coloumn="product" />
        </Fragment>
      )}
    </Layout>
  )
}

export default ListProduct
