import { api } from '.'

export type UpdatePersonRequest = {
  tmdbId: number
  name: string
  gender: number
  profilePath: string | null
}

export async function updatePerson({
  tmdbId,
  name,
  gender,
  profilePath,
}: UpdatePersonRequest) {
  const { data } = await api.patch(`/people/${tmdbId}`, {
    person: {
      name,
      gender,
      profile_path: profilePath,
    },
  })
  return data
}
