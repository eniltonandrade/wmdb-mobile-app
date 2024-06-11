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
  baseURL: 'http://192.168.0.8:3333/',
})

// api.interceptors.request.use(async (config) => {
//   console.log(config.headers)
//   await new Promise((resolve) => setTimeout(resolve, 2000))

//   return config
// })
