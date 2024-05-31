import axios from 'axios'

export type ApiResponse<T> = {
  total?: number
  results?: T[]
  result?: T
}

export const api = axios.create({
  baseURL: 'http://192.168.0.8:3333/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMTFiNzcyYS0xOWNjLTRiMDktYTViYy04NjViYTkzMGQ3Y2YiLCJpYXQiOjE3MTY4MzQ3MzcsImV4cCI6MTcxNzQzOTUzN30._ZZf9MPD1mzyg4jiBzVIQQFZH4KQq5J-xXqFLPwsynU`,
  },
})

// api.interceptors.request.use(async (config) => {
//   await new Promise((resolve) => setTimeout(resolve, 2000))

//   return config
// })
