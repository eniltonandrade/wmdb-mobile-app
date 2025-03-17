import { api } from '.'

export type UpdatePersonProps = {
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
}: UpdatePersonProps) {
  const { data } = await api.put(`person/${tmdbId}`, {
    person: {
      name,
      gender,
      profile_path: profilePath,
    },
  })
  return data
}
