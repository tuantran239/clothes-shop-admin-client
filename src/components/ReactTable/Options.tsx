import React from 'react'

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id }
}: any) => {
  const options = React.useMemo(() => {
    const options = new Set<any>()
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id])
    })
    return Array.from(options)
  }, [id, preFilteredRows])
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option: any, i: any) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}



export const SliderColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id }
}: any) => {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach((row: any) => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])
  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  )
}


export const NumberRangeColumnFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}: any) => {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach((row: any) => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem'
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem'
        }}
      />
    </div>
  )
}


function filterGreaterThan(rows: any, id: any, filterValue: any) {
  return rows.filter((row: any) => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number'
