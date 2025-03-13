import { api, ApiListResponse } from '.'
import { Genre } from './models/genre'

export async function fetchGenres() {
  const { data } = await api.get<ApiListResponse<Genre>>('genres')
  return data.results
}
