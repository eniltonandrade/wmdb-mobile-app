import axios from 'axios'

export type ApiListResponse<T> = {
  total?: number
  results: T[]
}

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})
