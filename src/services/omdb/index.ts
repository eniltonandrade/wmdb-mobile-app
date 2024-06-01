import axios from 'axios'

export type OmdbResponse = {
  Ratings: {
    Source: string
    Value: string
  }[]
}

export const omdbApi = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  params: {
    apikey: 'c4eb5528',
  },
})
