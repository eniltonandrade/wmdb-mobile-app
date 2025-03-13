import { convertRating } from '@/utils/rating'

import { MovieDetails } from '../tmdb/models/movie'
import { api, ApiResponse } from '.'
import { HistoryDetails } from './models/history-details'

export type AddMovieToHistoryProps = {
  movie: MovieDetails
  watchedDate: Date
  rating?: number
  ratings:
    | {
        Source: string
        Value: string
      }[]
    | undefined
}

export type MovieCreated = {
  created: boolean
  movieId: string
  historyId: string
}

const SOURCES = {
  IMDB: 'Internet Movie Database',
  ROTTEN_TOMATOES: 'Rotten Tomatoes',
  METACRITIC: 'Metacritic',
}

export async function addMovieToUserHistory({
  movie,
  rating,
  watchedDate,
  ratings,
}: AddMovieToHistoryProps): Promise<MovieCreated> {
  const imdbRating = ratings?.find(
    (item) => item.Source === SOURCES.IMDB,
  )?.Value

  const rottenTomatoesRating = ratings?.find(
    (item) => item.Source === SOURCES.ROTTEN_TOMATOES,
  )?.Value

  const metacriticRating = ratings?.find(
    (item) => item.Source === SOURCES.METACRITIC,
  )?.Value

  const response = await api.post<ApiResponse<MovieCreated>>('movies', {
    movie: {
      ...movie,
      tmdb_rating: convertRating(String(movie.vote_average)),
      imdb_rating: imdbRating ? convertRating(imdbRating) : undefined,
      rotten_tomatoes_rating: rottenTomatoesRating
        ? convertRating(rottenTomatoesRating)
        : undefined,
      metacritic_rating: metacriticRating
        ? convertRating(metacriticRating)
        : undefined,
    },
  })

  const { movieId, created } = response.data.result

  const historyResponse = await api.post<ApiResponse<HistoryDetails>>(
    `user/history/movies`,
    {
      history: {
        movieId,
        date: watchedDate,
        rating,
      },
    },
  )

  return {
    movieId,
    created,
    historyId: historyResponse.data.result.id,
  }
}
