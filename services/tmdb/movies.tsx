import { tmdbApi } from '.'
import { Language } from './models/common'
import { MovieDetails } from './models/movie'

export const details = async (id: number, language: Language) => {
  const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`, {
    params: {
      language,
    },
  })

  return data
}
