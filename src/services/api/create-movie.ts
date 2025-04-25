import { api } from '.'

export type CreateMovieRequest = {
  title: string
  originalTitle: string
  posterPath?: string | null
  backdropPath?: string | null
  releaseDate: Date | string
  runtime?: number | null
  imdbId: string
  id: number
}

export type CreateMovieResponse = {
  created: boolean
  id: string
}

export async function createMovie({
  imdbId,
  originalTitle,
  releaseDate,
  title,
  id,
  posterPath,
  backdropPath,
  runtime,
}: CreateMovieRequest): Promise<CreateMovieResponse> {
  const { data } = await api.post<CreateMovieResponse>('movies', {
    backdrop_path: backdropPath,
    imdb_id: imdbId,
    original_title: originalTitle,
    poster_path: posterPath,
    release_date: releaseDate,
    runtime,
    title,
    tmdb_id: id,
  })

  return data
}
