import { convertRating } from '@/utils/rating'
import { ApiResponse, api } from '.'
import { MovieDetails } from '../tmdb/models/movie'
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
}: AddMovieToHistoryProps): Promise<ApiResponse<HistoryDetails>> {
  const {
    genres,
    production_companies: productionCompanies,
    casts: { cast, crew },
    ...data
  } = movie

  const imdbRating = ratings?.find(
    (item) => item.Source === SOURCES.IMDB,
  )?.Value

  const rottenTomatoesRating = ratings?.find(
    (item) => item.Source === SOURCES.ROTTEN_TOMATOES,
  )?.Value

  const metacriticRating = ratings?.find(
    (item) => item.Source === SOURCES.METACRITIC,
  )?.Value

  const response = await api.post('movies', {
    movie: {
      ...data,
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

  const movieId = response.data.movie.id

  const onlyValidCrew = crew.filter(
    (c) => c.job === 'Director' || c.job === 'Screenplay',
  )

  const newHistory = await api.post(`user/history/movies`, {
    history: {
      movieId,
      date: watchedDate,
      rating,
    },
  })

  if (response.data.movie.created) {
    await Promise.all([
      api.post(`movies/genres/${movieId}`, {
        genres,
      }),

      api.post(`movies/companies/${movieId}`, {
        production_companies: productionCompanies,
      }),
    ])

    await api.post(`movies/crew/${movieId}`, {
      crew: onlyValidCrew,
    })

    await api.post(`movies/cast/${movieId}`, {
      cast,
    })
  }

  return newHistory.data
}
