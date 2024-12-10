import { api, ApiResponse } from '.'
import { CastStat } from './models/cast-stats'

type getPersonStatsProps = {
  personId?: string | null
}

export async function getPersonStats({ personId }: getPersonStatsProps) {
  const { data } = await api.get<ApiResponse<CastStat>>(
    `user/history/report/person/${personId}?preferred_rating=imdb_rating`,
  )
  return { person: data.result }
}
