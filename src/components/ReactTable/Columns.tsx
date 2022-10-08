import { RouteUrl } from '@/constants'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  NumberRangeColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter
} from './Options'
import moment from 'moment'

const onNavigateEdit = (url: string) => {
  window.location.replace(url)
}

export const USERCOLUMNS = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Name',
    accessor: 'name',
    filter: 'fuzzyText'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
    Cell: (data: any) => {
      return <p>{moment(data.row.original.createdAt).format('L')}</p>
    }
  },
  {
    Header: 'Edit',
    Cell: (data: any) => {
      return (
        <Button
          onClick={() =>
            onNavigateEdit(RouteUrl.EDIT_USER + `?id=${data.row.original.id}`)
          }
        >
          Edit
        </Button>
      )
    }
  }
]

export const PRODUCTCOLUMNS = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Image',
    accessor: 'mainImage',
    Cell: (data: any) => {
      return (
        <div className="d-flex justify-content-center">
          <img
            src={data.row.original.mainImage.url}
            alt="product image"
            width="100px"
            height="100px"
          />
        </div>
      )
    }
  },
  {
    Header: 'Name',
    accessor: 'name',
    filter: 'fuzzyText'
  },
  {
    Header: 'Posted At',
    accessor: 'createdAt',
    Cell: (data: any) => {
      return <p>{moment(data.row.original.createdAt).format('L')}</p>
    }
  },
  {
    Header: 'Edit',
    Cell: (data: any) => {
      return (
        <Button
          onClick={() =>
            onNavigateEdit(
              RouteUrl.EDIT_PRODUCT + `?id=${data.row.original.id}`
            )
          }
        >
          Edit
        </Button>
      )
    }
  }
]

export const ORDERCOLUMNS = [
  {
    Header: 'ID',
    accessor: 'OrderID'
  },
  {
    Header: 'State',
    accessor: 'state',
    Filter: SelectColumnFilter
  },
  {
    Header: 'Order At',
    accessor: 'createdAt',
    Cell: (data: any) => {
      return <p>{moment(data.row.original.createdAt).format('L')}</p>
    }
  },
  {
    Header: 'Edit',
    Cell: (data: any) => {
      return (
        <Button
          onClick={() =>
            onNavigateEdit(RouteUrl.EDIT_ORDER + `?id=${data.row.original.id}`)
          }
        >
          Edit
        </Button>
      )
    }
  }
]
