import { api, ApiListResponse } from '.'
import { GenreStats } from './models/genre-stats'

export async function fetchGenreStats() {
  const { data } = await api.get<ApiListResponse<GenreStats>>(
    'user/history/report/genre?sort_by=count.desc&preferred_rating=imdb_rating',
  )
  return data
}
