import { api, ApiListResponse } from '.'
import { PreferredRatingType } from './models/common'
import { YearStats } from './models/year-stats'

export type YearSortType =
  | 'count.asc'
  | 'count.desc'
  | 'average.asc'
  | 'average.desc'
  | 'year.asc'
  | 'year.desc'

export type QueryParams = {
  preferred_rating: PreferredRatingType
  sort_by: YearSortType
}

interface FetchWatchedYearStatsProps {
  params?: QueryParams | null
}

export async function fetchWatchedYearStats({
  params,
}: FetchWatchedYearStatsProps) {
  const { data } = await api.get<ApiListResponse<YearStats>>(
    'user/history/report/year/watched',
    {
      params,
    },
  )
  return data
}
