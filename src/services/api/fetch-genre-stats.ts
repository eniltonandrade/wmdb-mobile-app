import { api, ApiListResponse } from '.'
import { SortType } from './fetch-cast-stats'
import { GenreStats } from './models/genre-stats'

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

export async function fetchGenreStats({ page, params }: FetchCrewStatsProps) {
  const { data } = await api.get<ApiListResponse<GenreStats>>(
    'user/history/report/genre',
    {
      params: {
        ...params,
        page,
      },
    },
  )
  return data
}
