import { api } from '.'
import { Person } from './types'

export type FindOrCreatePersonRequest = {
  name: string
  profilePath?: string | null
  tmdbId: number
  gender: number
}

export async function findOrCreatePerson({
  gender,
  name,
  tmdbId,
  profilePath,
}: FindOrCreatePersonRequest) {
  const { data } = await api.post<Person>(`/people`, {
    gender,
    name,
    tmdb_id: tmdbId,
    profile_path: profilePath,
  })
  return data
}
