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
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzg2MzJlZS1lZjVhLTRhODMtODczMC1jN2YxM2ZhYWM4NjQiLCJpYXQiOjE3MTc3ODYzMzksImV4cCI6MTcxODM5MTEzOX0.RW49PWKQah59ihKZW08ExMdcQMGcT-cB0g95IIfRuCY`,
  },
})

// api.interceptors.request.use(async (config) => {
//   await new Promise((resolve) => setTimeout(resolve, 2000))

//   return config
// })
