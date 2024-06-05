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
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNTIxYjliMi1kN2ExLTRjZGYtOTJkYS0yMWQ1NDgyM2ExMjgiLCJpYXQiOjE3MTc1MDgwNTIsImV4cCI6MTcxODExMjg1Mn0.8D2Hl0LBnaEWCw8LnWiAhH5sB41mN42Yv0KnicnKajk`,
  },
})

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return config
})
