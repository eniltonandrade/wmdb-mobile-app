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
  // baseURL: 'https://wmdb-api-v2.onrender.com/',
  baseURL: 'http://9.62.36.197:3333/',
})

// api.interceptors.request.use(async (config) => {
//   // await new Promise((resolve) => setTimeout(resolve, 14000))
//   return config
// })
