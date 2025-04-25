import { api } from '.'

export type User = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  preferredRating: string | null
}

export async function getUserProfile() {
  const { data } = await api.get<User>('/me/profile')

  return data
}
