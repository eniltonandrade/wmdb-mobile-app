import { api, ApiListResponse } from '.'
import { CrewStat } from './models/crew-stats'

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
  preferred_rating: PreferredRatingType
  gender?: number
  page?: number
  job?: string
  sort_by: SortType
}

interface FetchCrewStatsProps {
  params?: QueryParams | null
  page: number
}

export async function fetchCrewStats(params: FetchCrewStatsProps) {
  const { data } = await api.get<ApiListResponse<CrewStat>>(
    'user/history/report/crew',
    {
      params: {
        ...params.params,
        page: params.page,
      },
    },
  )
  return data
}
