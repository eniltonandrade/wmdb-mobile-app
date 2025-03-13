import { api, ApiResponse } from '.'
import { Genre } from './models/genre'

type getGenreByExternalIdProps = {
  tmdbId: string
}

export async function getGenreByExternalId({
  tmdbId,
}: getGenreByExternalIdProps) {
  const { data } = await api.get<ApiResponse<Genre>>(`genre/external/${tmdbId}`)
  return { genre: data.result }
}
