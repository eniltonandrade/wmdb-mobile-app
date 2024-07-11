import { ListResponse, tmdbApi } from '.'
import { Language } from './models/common'
import { Movie } from './models/movie'

export const searchMoviesInTmdb = async (query: string, language: Language) => {
  const { data } = await tmdbApi.get<ListResponse<Movie>>(`search/movie`, {
    params: {
      language,
      query,
    },
  })

  return data.results
}
