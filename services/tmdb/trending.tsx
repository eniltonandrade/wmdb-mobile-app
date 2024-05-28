import { ListResponse, tmdbApi } from '.'
import { Language } from './models/common'
import { Movie } from './models/movie'

export const getTrendingMovies = async (
  language: Language,
  timeWindow: 'day' | 'week',
) => {
  const { data } = await tmdbApi.get<ListResponse<Movie>>(
    `/trending/movie/${timeWindow}`,
    {
      params: {
        language,
      },
    },
  )

  console.log(data)

  return data
}
