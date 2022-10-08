export type Error = {
  message: string
  field: string
}

export type ErrorResponse = {
  name: string
  error: Error[]
  status: number
}
