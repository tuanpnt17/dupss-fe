export {}

declare global {
  interface IRequest {
    endpoint: string
    method?: string
    body?: { [key: string]: any }
    queryParams?: any
    useCredentials?: boolean
    headers?: any
    nextOption?: any
    isServerSideRoute?: boolean
  }

  interface IBackendResponse<T> {
    value: T
    error: {
      code: string
      message: string
    }
    isSuccess?: boolean
  }

  interface IModelPaginate<T> {
    totalCount: number
    items: T[]
    pageIndex: number
    pageSize: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
}
