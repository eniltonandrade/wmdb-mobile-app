import { tmdbApi } from '.'
import { Language } from './models/common'
import { PersonDetails } from './models/person'

export const getPersonDetails = async (id: number, language: Language) => {
  const { data } = await tmdbApi.get<PersonDetails>(`/person/${id}`, {
    params: {
      language,
      append_to_response: 'casts',
    },
  })

  return data
}
