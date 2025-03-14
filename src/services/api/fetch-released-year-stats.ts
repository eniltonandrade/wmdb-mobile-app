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

interface FetchReleasedYearStatsProps {
  params?: QueryParams | null
}

export async function fetchReleasedYearStats({
  params,
}: FetchReleasedYearStatsProps) {
  const { data } = await api.get<ApiListResponse<YearStats>>(
    'user/history/report/year/release',
    {
      params,
    },
  )
  return data
}
