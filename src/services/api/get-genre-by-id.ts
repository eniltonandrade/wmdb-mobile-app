import { api } from '.'
import { Genre } from './types'

type getGenreByExternalIdRequest = {
  id: string
}

export async function getGenreById({ id }: getGenreByExternalIdRequest) {
  const { data } = await api.get<Genre>(`/genres/${id}`)
  return data
}
