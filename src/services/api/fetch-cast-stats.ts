import { api, ApiListResponse } from '.'
import { CastStat } from './models/cast-stats'

export type SortType =
  | 'count.asc'
  | 'count.desc'
  | 'average.asc'
  | 'average.desc'

export type PreferredRatingType =
  | 'imdb_rating'
  | 'tmdb_rating'
  | 'metacritic_rating'
  | 'rotten_tomatoes_rating'

export type QueryParams = {
  preferred_rating?: PreferredRatingType
  gender?: number
  page?: number
  sort_by: SortType
}

interface FetchCastStatsProps {
  params?: QueryParams | null
  page: number
}

export async function fetchCastStats(params: FetchCastStatsProps) {
  const { data } = await api.get<ApiListResponse<CastStat>>(
    'user/history/report/cast',
    {
      params: {
        ...params.params,
        page: params.page,
      },
    },
  )
  return data
}
