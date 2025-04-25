import { api } from '.'

type CreateNewUserRequest = {
  name: string
  email: string
  password: string
}
export async function createNewUser({
  name,
  email,
  password,
}: CreateNewUserRequest) {
  await api.post(`/sessions/register`, {
    name,
    email,
    password,
  })
}
