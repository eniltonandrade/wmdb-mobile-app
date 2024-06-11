import { api } from '.'

type SignInWithPasswordRequest = {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  token: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const { data } = await api.post<SignInWithPasswordResponse>(
    `sessions/password`,
    {
      email,
      password,
    },
  )

  const { token } = data

  return token
}
