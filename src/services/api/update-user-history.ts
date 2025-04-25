import { api } from '.'

export type UpdateUserHistoryRequest = {
  historyId: string
  date?: Date
  review?: string | null
  rating?: number | null
}

export type UpdateUserHistoryResponse = {
  id: string
  date?: Date
  review?: string | null
  rating?: number | null
}

export async function updateUserHistory({
  historyId,
  date,
  rating,
  review,
}: UpdateUserHistoryRequest): Promise<UpdateUserHistoryResponse> {
  const { data } = await api.patch(`/me/history/${historyId}`, {
    date,
    rating,
    review,
  })
  return data
}
