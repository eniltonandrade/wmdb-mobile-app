import { api, ApiResponse } from '.'
import { PreferredRatingType } from './fetch-cast-stats'

export type QueryParams = {
  preferred_rating: PreferredRatingType
}

export type UserHistoryStats = {
  averageRating: number
  movieCount: number
  totalRuntime: number
}

export async function getUserHistoryStats(
  params: QueryParams,
): Promise<UserHistoryStats> {
  const { data } = await api.get<ApiResponse<UserHistoryStats>>(
    'user/history/report',
    {
      params,
    },
  )

  return data.result
}
