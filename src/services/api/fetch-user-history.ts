import { api, ApiListResponse } from '.'
import { History } from './types'

export type HistoriesSortType =
  | 'release_date.asc'
  | 'release_date.desc'
  | 'watched_date.asc'
  | 'watched_date.desc'
  | 'rating_imdb.asc'
  | 'rating_imdb.desc'
  | 'rating_tmdb.asc'
  | 'rating_tmdb.desc'
  | 'rating_metacritic.asc'
  | 'rating_metacritic.desc'
  | 'rating_rotten.asc'
  | 'rating_rotten.desc'
  | 'rating_user.asc'
  | 'rating_user.desc'

export type FetchUseHistoryFilters = {
  genre_id?: string
  person_id?: string
  company_id?: string
  release_year?: string
  watched_year?: string
  sort_by: HistoriesSortType
}

interface FetchUseHistoryRequest {
  filters?: FetchUseHistoryFilters | null
  page: number
}

export async function fetchUseHistory({
  filters,
  page,
}: FetchUseHistoryRequest) {
  const { data } = await api.get<ApiListResponse<History>>(
    `/me/history/movies`,
    {
      params: {
        ...filters,
        page,
      },
    },
  )

  const { results, total } = data

  return { histories: results, total }
}
