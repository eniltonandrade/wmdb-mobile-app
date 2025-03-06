import { api, ApiListResponse } from '.'
import { UserMovieStats } from './models/user-movie-stats'

export async function fetchMovieCountByWatchedYear() {
  const { data } = await api.get<ApiListResponse<UserMovieStats>>(
    `user/history/report/year/watched?preferred_rating=imdb_rating`,
  )
  return data.results
}
