import { api, ApiListResponse } from '.'
import { RatingSources, YearInsight } from './types'

export type YearSortType =
  | 'count.asc'
  | 'count.desc'
  | 'average.asc'
  | 'average.desc'
  | 'year.asc'
  | 'year.desc'

export type WatchedYearInsightsListFilters = {
  selected_rating?: RatingSources
  sort_by: YearSortType
}

interface FetchWatchedYearInsightsListRequest {
  filters?: WatchedYearInsightsListFilters | null
}

export async function fetchWatchedYearInsightsList({
  filters,
}: FetchWatchedYearInsightsListRequest) {
  const { data } = await api.get<ApiListResponse<YearInsight>>(
    '/me/insights/watched-years',
    {
      params: {
        ...filters,
      },
    },
  )
  return data
}
