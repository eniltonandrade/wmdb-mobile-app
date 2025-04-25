import { api } from '.'

export type CreateUserHistoryRequest = {
  movieId: string
  watchedDate: Date
  rating?: number | null
}

export type CreateUserHistoryResponse = {
  historyId: string
}

export type CreateUserHistoryApiResponse = {
  id: string
}

export async function createUserHistory({
  rating,
  watchedDate,
  movieId,
}: CreateUserHistoryRequest): Promise<CreateUserHistoryResponse> {
  const { data } = await api.post<{ id: string }>(`/me/history/movies`, {
    movieId,
    date: watchedDate,
    rating,
  })

  return {
    historyId: data.id,
  }
}
