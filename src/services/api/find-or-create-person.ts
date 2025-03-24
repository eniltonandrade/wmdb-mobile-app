import { api, ApiResponse } from '.'
import { Person } from './models/person'

export type FindOrCreatePersonProps = {
  name: string
  profilePath?: string | null
  id: number
  gender: number
}

export async function findOrCreatePerson({
  gender,
  name,
  id,
  profilePath,
}: FindOrCreatePersonProps) {
  const { data } = await api.post<ApiResponse<Person>>(`person`, {
    gender,
    name,
    id,
    profile_path: profilePath,
  })
  return data.result
}
