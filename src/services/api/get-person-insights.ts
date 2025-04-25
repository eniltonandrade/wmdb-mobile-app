import { api } from '.'
import { PersonInsightDetails } from './types'

type getPersonStatsRequest = {
  personId: string
}

export async function getPersonInsights({ personId }: getPersonStatsRequest) {
  const { data } = await api.get<PersonInsightDetails>(
    `/me/insights/people/${personId}`,
  )
  return data
}
