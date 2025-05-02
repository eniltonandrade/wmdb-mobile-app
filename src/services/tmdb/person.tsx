import { tmdbApi } from '.'
import { Language } from './models/common'
import { PersonResponse } from './models/person'

export const getPersonDetails = async (id: number, language: Language) => {
  const { data } = await tmdbApi.get<PersonResponse>(`/person/${id}`, {
    params: {
      language,
      append_to_response: 'credits,images',
    },
  })

  return data
}
