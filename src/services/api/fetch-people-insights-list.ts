import { api, ApiListResponse } from '.'
import { PersonInsight, RatingSources, SortType } from './types'

export type PeopleInsightListFilters = {
  selected_rating?: RatingSources
  gender?: number
  query?: string
  role?: 'cast' | 'director' | 'writer' | 'producer'
  sort_by: SortType
}

interface FetchPeopleInsightsListRequest {
  filters?: PeopleInsightListFilters | null
  page?: number
}

export async function fetchPeopleInsightsList({
  page,
  filters,
}: FetchPeopleInsightsListRequest): Promise<ApiListResponse<PersonInsight>> {
  const { data } = await api.get<ApiListResponse<PersonInsight>>(
    '/me/insights/people',
    {
      params: {
        ...filters,
        page,
      },
    },
  )
  return data
}
