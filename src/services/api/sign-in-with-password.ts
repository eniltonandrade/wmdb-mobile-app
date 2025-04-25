import { api } from '.'

type SignInWithPasswordRequest = {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  access_token: string
  refresh_token: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const { data } = await api.post<SignInWithPasswordResponse>(
    '/sessions/password',
    {
      email,
      password,
    },
  )

  return data
}
