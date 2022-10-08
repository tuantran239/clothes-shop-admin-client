import React, { Fragment, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ReactTable from '@/components/ReactTable'
import { ApiUrl, RouteUrl } from '@/constants'
import { useQuery } from 'react-hooks-axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Filter from '@/components/Filter'

const ListUser = () => {
  const [users, setUsers] = useState<any[]>([])

  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [rows, setRows] = useState(searchParams.get('rows') || '1000')

  const { queryCallback } = useQuery()
  const [queryUsers, { loading }] = queryCallback()

  const navigate = useNavigate()

  useEffect(() => {
    const query = `?search=${search}&rows=${rows}`
    navigate(RouteUrl.LIST_USER + query)
    queryUsers({
      url: ApiUrl.User.LIST_USER + query,
      onCompleted(data) {
        setUsers(data?.users || [])
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
          <ReactTable data={users} coloumn="user" />
        </Fragment>
      )}
    </Layout>
  )
}

export default ListUser
