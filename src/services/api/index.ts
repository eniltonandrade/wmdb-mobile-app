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
  baseURL: 'http://localhost:3333/',
})

api.interceptors.request.use(async (config) => {
  // await new Promise((resolve) => setTimeout(resolve, 14000))
  return config
})
