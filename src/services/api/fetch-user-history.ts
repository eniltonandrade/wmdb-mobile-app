import { api, ApiListResponse } from '.'
import { HistoryDetails } from './models/history-details'

export type SortType =
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

export type queryParams = {
  genre_id?: string
  cast_member_id?: string
  crew_member_id?: string
  company_id?: string
  release_year?: string
  watched_year?: string
  sort_by: SortType
}

interface fetchUseHistory {
  params?: queryParams | null
  page: number
}

export async function fetchUseHistory(params: fetchUseHistory) {
  const { data } = await api.get<ApiListResponse<HistoryDetails>>(
    `user/history/movies`,
    {
      params: {
        ...params.params,
        page: params.page,
      },
    },
  )

  const { results, total } = data

  return { histories: results, total }
}
