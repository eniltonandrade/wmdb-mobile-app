import { api, ApiListResponse } from '.'
import { Genre } from './types'

export async function fetchGenres() {
  const { data } = await api.get<ApiListResponse<Genre>>('/genres')
  return data.results
}
