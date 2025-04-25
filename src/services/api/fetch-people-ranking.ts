import { api, ApiListResponse } from '.'
import { PersonInsight } from './types'

export type FetchPeopleRankingFilters = {
  gender?: number
  page?: number
  role?: 'cast' | 'director' | 'writer' | 'producer'
}

export interface FetchPeopleRankingRequest {
  filters?: FetchPeopleRankingFilters | null
  page: number
}

export async function fetchPeopleRanking({
  page,
  filters,
}: FetchPeopleRankingRequest) {
  const { data } = await api.get<ApiListResponse<PersonInsight>>(
    '/me/insights/people/rankings',
    {
      params: {
        ...filters,
        page,
      },
    },
  )
  return data.results
}
