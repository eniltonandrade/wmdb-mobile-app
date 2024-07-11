import { api, ApiResponse } from '.'

export type User = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  preferredRating: string | null
}

export async function getUserProfile() {
  const { data } = await api.get<ApiResponse<User>>('profile')
  return data.result
}
