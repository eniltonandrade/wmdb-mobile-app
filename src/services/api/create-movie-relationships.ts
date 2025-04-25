import { convertRating } from '@/utils/rating'

import { MovieDetails } from '../tmdb/models/movie'
import { api } from '.'

export type CreateMovieRelationshipsRequest = {
  movie: MovieDetails
  movieId: string
  ratings:
    | {
        Source: string
        Value: string
      }[]
    | undefined
}

export async function createMovieRelationships({
  movie,
  movieId,
  ratings = [],
}: CreateMovieRelationshipsRequest): Promise<undefined> {
  const {
    genres,
    production_companies,
    casts: { cast, crew },
  } = movie

  const formattedRatings = ratings.map((rating) => {
    const value = convertRating(rating.Value)
    if (rating.Source === 'Internet Movie Database') {
      return {
        source: 'IMDB',
        value,
      }
    }
    if (rating.Source === 'Rotten Tomatoes') {
      return {
        source: 'ROTTEN_TOMATOES',
        value,
      }
    }
    if (rating.Source === 'Metacritic') {
      return {
        source: 'METACRITIC',
        value,
      }
    }

    return {
      source: rating.Source,
      value,
    }
  })

  formattedRatings.push({
    source: 'TMDB',
    value: convertRating(String(movie.vote_average)),
  })

  const onlyValidCrew = crew.filter(
    (c) => c.job === 'Director' || c.job === 'Screenplay',
  )

  await api.post(`/movies/${movieId}/create-relations`, {
    ratings: formattedRatings,
    genres,
    production_companies,
    casts: {
      cast,
      crew: onlyValidCrew,
    },
  })
}
