import { api } from '.'
import { History } from './models/history'

type getUserHistoryByMovieIdRequest = {
  movieId?: string | null
}

export async function getUserHistoryByMovieId({
  movieId,
}: getUserHistoryByMovieIdRequest) {
  if (!movieId) return null

  const { data } = await api.get<History>(`/me/history/movies/${movieId}`)

  return data
}
