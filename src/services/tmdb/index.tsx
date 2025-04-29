import axios from 'axios'

export type ListResponse<T> = {
  page: number
  results: T[]
  total_results: number
  total_pages: number
}

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${process.env.EXPO_TMDB_API_KEY}`,
  },
})
