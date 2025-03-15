import axios from 'axios'

export type ApiResponse<T> = {
  total?: number
  result: T
}

export type ApiListResponse<T> = {
  total?: number
  results: T[]
}

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  // baseURL: 'http://192.168.0.6:3333/',
  // baseURL: 'http:/9.62.36.197:3333/',
})

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error.response)
//     if (error.response.status === 401) {
//       router.replace('/sign-in')
//     }
//   },
// )
