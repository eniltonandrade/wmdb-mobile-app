import { api } from '.'
import { Movie } from './types'

type getMovieByExternalIdRequest = {
  id: string
}

export async function getMovieById({ id }: getMovieByExternalIdRequest) {
  const { data } = await api.get<Movie>(`/movies/${id}`)
  return data
}
