import { api, ApiResponse } from '.'
import { Person } from './models/person'

type getPersonByExternalIdProps = {
  tmdbId: string
}

export async function getPersonByExternalId({
  tmdbId,
}: getPersonByExternalIdProps) {
  const { data } = await api.get<ApiResponse<Person>>(
    `person/external/${tmdbId}`,
  )
  return { person: data.result }
}
