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
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2IyMGExMzc2OWRiOTlhOWIyYmM1NWNiNjQ1Yzk4OSIsInN1YiI6IjU4ZDI4NmQwYzNhMzY4MzkwODAxYzliYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCeGItKZHabf1QGlLUKfSjqtenTyUKlmB3UjpegFSCw',
  },
})
