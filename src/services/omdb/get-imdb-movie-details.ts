import { omdbApi, OmdbResponse } from '.'

export const getImdbMovieDetails = async (movieId?: string | null) => {
  if (!movieId) return null
  const { data } = await omdbApi.get<OmdbResponse>(`/`, {
    params: {
      i: movieId,
    },
  })

  return data
}
