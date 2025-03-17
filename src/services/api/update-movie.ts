import { convertRating } from '@/utils/rating'

import { api } from '.'

const SOURCES = {
  IMDB: 'Internet Movie Database',
  ROTTEN_TOMATOES: 'Rotten Tomatoes',
  METACRITIC: 'Metacritic',
}

export type UpdateMovieProps = {
  movieId: string
  backdrop_path: string
  poster_path?: string | null
  tmdb_rating: number | null
  ratings:
    | {
        Source: string
        Value: string
      }[]
    | undefined
}

export async function updateMovie(payload: UpdateMovieProps) {
  const { movieId, ratings, ...movie } = payload

  const imdbRating = ratings?.find(
    (item) => item.Source === SOURCES.IMDB,
  )?.Value

  const rottenTomatoesRating = ratings?.find(
    (item) => item.Source === SOURCES.ROTTEN_TOMATOES,
  )?.Value

  const metacriticRating = ratings?.find(
    (item) => item.Source === SOURCES.METACRITIC,
  )?.Value

  const { data } = await api.put(`movies/${movieId}`, {
    movie: {
      ...movie,
      tmdb_rating: convertRating(String(movie.tmdb_rating)),
      imdb_rating: imdbRating ? convertRating(imdbRating) : undefined,
      rotten_tomatoes_rating: rottenTomatoesRating
        ? convertRating(rottenTomatoesRating)
        : undefined,
      metacritic_rating: metacriticRating
        ? convertRating(metacriticRating)
        : undefined,
    },
  })
  return data
}
