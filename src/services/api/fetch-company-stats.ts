import { api, ApiListResponse } from '.'
import { SortType } from './fetch-cast-stats'
import { CompanyStats } from './models/company-stats'

export type PreferredRatingType =
  | 'imdb_rating'
  | 'tmdb_rating'
  | 'metacritic_rating'
  | 'rotten_tomatoes_rating'

export type QueryParams = {
  preferred_rating: PreferredRatingType
  page?: number
  sort_by: SortType
}

interface FetchCrewStatsProps {
  params?: QueryParams | null
  page: number
}

export async function fetchCompanyStats({ page, params }: FetchCrewStatsProps) {
  const { data } = await api.get<ApiListResponse<CompanyStats>>(
    'user/history/report/company',
    {
      params: {
        ...params,
        page,
      },
    },
  )
  return data
}
