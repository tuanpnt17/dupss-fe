/* eslint-disable lines-around-comment */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prefer-const */
import queryString from 'query-string'

export const sendRequest = async <T>(props: IRequest) => {
  let {
    endpoint,
    method,
    useCredentials = false,
    body,
    headers = {},
    queryParams = {},
    nextOption = {},
    isServerSideRoute
  } = props
  const isFormData = body instanceof FormData
  const options: any = {
    method: method ?? 'GET',
    headers: new Headers(isFormData ? headers : { 'content-type': 'application/json', ...headers }),
    body: body ? (isFormData ? body : JSON.stringify(body)) : null,
    ...nextOption
  }
  if (useCredentials) options.credentials = 'include'

  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set')
  }
  let url = isServerSideRoute === true ? endpoint : `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`
  }
  console.debug(`Sending request to: ${url}`)

  return fetch(url, options).then(res => {
    if (res.ok) {
      return res.json() as T
    } else {
      return res.text().then(errorText => {
        console.error(`Error response body:`, errorText)
        let errorData: any = {}
        try {
          errorData = JSON.parse(errorText)
        } catch (parseError) {
          console.error(`Error response is not JSON:`, errorText)
        }

        return {
          isSuccess: errorData?.isSuccess ?? false,
          error: {
            code: errorData?.error?.code ?? res.status.toString(),
            message: errorData?.error?.message ?? errorData?.detail ?? res.statusText
          }
        } as T
      })
    }
  })
}

// export const sendRequestFile = async <T>(props: IRequest) => {
//   let { endpoint, method, useCredentials = false, body, headers = {}, queryParams = {}, nextOption = {} } = props
//   const options: any = {
//     method: method,
//     // by default setting the content-type to be json type
//     headers: new Headers({ 'content-type': 'application/json', ...headers }),
//     body: body ? body : null,
//     ...nextOption
//   }
//   if (useCredentials) options.credentials = 'include'

//   const baseUrl = process.env.NEXT_PUBLIC_API_URL
//   if (!baseUrl) {
//     throw new Error('NEXT_PUBLIC_API_URL environment variable is not set')
//   }
//   let url = `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
//   if (queryParams) {
//     url = `${url}?${queryString.stringify(queryParams)}`
//   }
//   console.debug(`Sending request to: ${url}`)

//   return fetch(url, options).then(res => {
//     if (res.ok) {
//       return res.json() as T
//     } else {
//       return res.text().then(errorText => {
//         console.error(`Error response body:`, errorText)
//         let errorData: any = {}
//         try {
//           errorData = JSON.parse(errorText)
//         } catch (parseError) {
//           console.error(`Error response is not JSON:`, errorText)
//         }

//         return {
//           isSuccess: errorData?.isSuccess ?? false,
//           error: {
//             code: errorData?.error?.code ?? res.status.toString(),
//             message: errorData?.error?.message ?? errorData?.detail ?? res.statusText
//           }
//         } as T
//       })
//     }
//   })
// }
