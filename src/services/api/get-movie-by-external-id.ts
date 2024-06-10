import { api, ApiResponse } from '.'
import { Movie } from './models/movie'

type getMovieByExternalIdProps = {
  movieId: string
  tmdb?: boolean
  imdb?: boolean
}

export async function getMovieByExternalId({
  imdb,
  movieId,
  tmdb,
}: getMovieByExternalIdProps) {
  let params = {}

  if (tmdb) {
    params = {
      is_tmdb_id: true,
    }
  }

  if (imdb) {
    params = {
      is_imdb_id: true,
    }
  }
  const { data } = await api.get<ApiResponse<Movie>>(
    `movies/external/${movieId}`,
    {
      params,
    },
  )
  return { movie: data.result }
}
