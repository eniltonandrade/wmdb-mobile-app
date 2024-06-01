import { tmdbApi } from '.'
import { Language } from './models/common'
import { MovieDetails } from './models/movie'

export const getMovieDetails = async (id: number, language: Language) => {
  const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`, {
    params: {
      language,
      append_to_response: 'casts',
    },
  })

  return data
}
