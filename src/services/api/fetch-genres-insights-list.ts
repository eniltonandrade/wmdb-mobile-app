import { api, ApiListResponse } from '.'
import { Filters, GenreInsight } from './types'

export type GenresInsightListFilters = Filters

interface FetchGenresInsightsListRequest {
  filters?: GenresInsightListFilters | null
  page: number
}

export async function fetchGenresInsightList({
  page,
  filters,
}: FetchGenresInsightsListRequest) {
  const { data } = await api.get<ApiListResponse<GenreInsight>>(
    '/me/insights/genres',
    {
      params: {
        ...filters,
        page,
      },
    },
  )
  return data
}
