import { api, ApiResponse } from '.'
import { Movie } from './models/movie'

type getMovieByIdProps = {
  movieId?: string | null
}

export async function getMovieById({ movieId }: getMovieByIdProps) {
  const { data } = await api.get<ApiResponse<Movie>>(`movies/${movieId}`)
  return data.result
}
