import React from 'react'
import { ORDERCOLUMNS, PRODUCTCOLUMNS, USERCOLUMNS } from './Columns'
import { Table, Pagination, Container, Row, Col } from 'react-bootstrap'
import {
  useTable,
  useSortBy,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  usePagination,
  useExpanded
} from 'react-table'
import { matchSorter } from 'match-sorter'

interface PropsType {
  data: any
  coloumn: 'user' | 'product' | 'order'
}

const ReactTable = ({ data, coloumn }: PropsType) => {
  const getColumn = () => {
    if (coloumn === 'user') return USERCOLUMNS
    if (coloumn === 'product') return PRODUCTCOLUMNS
    if (coloumn === 'order') return ORDERCOLUMNS
    else return []
  }

  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
  }: any) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined)
    }, 200)

    return (
      <span>
        Search:{' '}
        <input
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0'
          }}
        />
      </span>
    )
  }

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter }
  }: any) {
    const count = preFilteredRows.length

    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }

  function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
    return matchSorter(rows, filterValue, {
      keys: [(row: any) => row.values[id]]
    })
  }

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      }
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable<any>(
    {
      columns: getColumn(),
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  )

  return (
    <Container>
      <Row>
        <Col>
          <Pagination>
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Next onClick={() => nextPage()} />
          </Pagination>
          <div style={{ overflowX: 'auto' }} className="w-full">
            <Table className="w-32" bordered hover {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render('Header')}
                        <div>
                          {column.canFilter ? column.render('Filter') : null}
                        </div>
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th
                    colSpan={visibleColumns.length}
                    style={{
                      textAlign: 'left'
                    }}
                  >
                    <GlobalFilter
                      preGlobalFilteredRows={preGlobalFilteredRows}
                      globalFilter={state.globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </th>
                </tr>
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row: any, i: any) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell: any) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ReactTable
