import { ApiListResponse, api } from '.'
import { CastStat } from './models/cast-stats'

type queryParams = {
  gender?: 1 | 2
  sort_by: 'average.desc' | 'average.asc' | 'count.asc' | 'count.desc'
  preferred_rating:
    | 'imdb_rating'
    | 'tmdb_rating'
    | 'metacritic_rating'
    | 'rotten_tomatoes_rating'
}

export async function getCastStats(params: queryParams) {
  const { data } = await api.get<ApiListResponse<CastStat>>(
    `/user/history/report/cast`,
    {
      params,
    },
  )

  return data.results
}
