import { MovieDetails } from '../tmdb/models/movie'
import { api } from '.'

export type CreateMovieRelationshipsProps = {
  movie: MovieDetails
  movieId: string
}

export async function createMovieRelationships({
  movie,
  movieId,
}: CreateMovieRelationshipsProps): Promise<undefined> {
  const {
    genres,
    production_companies: productionCompanies,
    casts: { cast, crew },
  } = movie

  const onlyValidCrew = crew.filter(
    (c) => c.job === 'Director' || c.job === 'Screenplay',
  )

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
