import { api } from '.'

export type UpdateUserHistoryProps = {
  historyId: string
  date?: Date
  review?: string | null
  rating?: number | null
}

export async function updateUserHistory({
  historyId,
  date,
  rating,
  review,
}: UpdateUserHistoryProps) {
  const { data } = await api.put(`user/history/${historyId}`, {
    history: {
      date,
      rating,
      review,
    },
  })
  return data
}
