import { ApiResponse, api } from '.'
import { History } from './models/history'

type getUserHistoryByMovieIdProps = {
  movieId?: string | null
}

export async function getUserHistoryByMovieId({
  movieId,
}: getUserHistoryByMovieIdProps) {
  if (!movieId) return null

  const { data } = await api.get<ApiResponse<History>>(
    `user/history/movies/${movieId}`,
  )

  return data.result
}
