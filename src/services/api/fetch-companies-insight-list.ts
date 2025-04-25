import { api, ApiListResponse } from '.'
import { CompanyInsight, RatingSources, SortType } from './types'

export type CompaniesInsightListFilters = {
  selected_rating?: RatingSources
  sort_by: SortType
}

interface FetchCompaniesInsightsListRequest {
  filters?: CompaniesInsightListFilters | null
  page: number
}

export async function fetchCompaniesInsightList({
  page,
  filters,
}: FetchCompaniesInsightsListRequest) {
  const { data } = await api.get<ApiListResponse<CompanyInsight>>(
    '/me/insights/companies',
    {
      params: {
        ...filters,
        page,
      },
    },
  )
  return data
}
