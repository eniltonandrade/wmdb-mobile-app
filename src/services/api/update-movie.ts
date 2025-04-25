import { api } from '.'

export type UpdateMovieRequest = {
  movieId: string
  title?: string
  originalTitle?: string
  posterPath?: string | null
  backdropPath?: string | null
  releaseDate?: Date | string
  runtime?: number | null
  imdbId?: string
}

export async function updateMovie({ movieId, ...data }: UpdateMovieRequest) {
  await api.patch(`/movies/${movieId}`, {
    movie: {
      ...data,
      release_date: data.releaseDate,
      poster_path: data.posterPath,
      backdrop_path: data.backdropPath,
      original_title: data.originalTitle,
      imdb_id: data.imdbId,
    },
  })
}
