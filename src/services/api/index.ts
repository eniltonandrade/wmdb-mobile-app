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
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZmZhNWNjNi04MmFhLTQyZDgtOWRhMS1hYjZiNzE2MjQwMjUiLCJpYXQiOjE3MTc1OTI2MTgsImV4cCI6MTcxODE5NzQxOH0.zjL2aN8Yob2N6Io75bxzpDcfENtgDGgpeMRxovyx0vg`,
  },
})

// api.interceptors.request.use(async (config) => {
//   await new Promise((resolve) => setTimeout(resolve, 2000))

//   return config
// })
