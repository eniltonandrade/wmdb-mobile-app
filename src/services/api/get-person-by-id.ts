import { api } from '.'
import { Person } from './types'

type getPersonByIdRequest = {
  id: string
}

export async function getPersonById({ id }: getPersonByIdRequest) {
  const { data } = await api.get<Person>(`/people/${id}`)
  return data
}
