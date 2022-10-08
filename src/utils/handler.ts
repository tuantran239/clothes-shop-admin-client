import { SizeProduct } from '../constants'

export const handleError = (error: any) => {
  const defaultError = {
    name: 'Error',
    status: 500,
    error: [{ message: 'Error System', field: 'server' }]
  }
  if (error.response && error.response.data) {
    return error.response.data
  }
  return defaultError
}

export const handleUnique = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index
}

export const handleSortSizes = (sizes: string[]) => {
  const sz = Object.keys(SizeProduct).map((k) => k)
  const res: string[] = []
  sz.forEach((size) => {
    if (sizes.includes(size)) {
      res.push(size)
    }
  })
  return res
}
