import { api } from '.'
import { UserHistoryInsights } from './types'

export async function getUserHistoryInsights() {
  const { data } = await api.get<UserHistoryInsights>('/me/insights')

  return data
}
