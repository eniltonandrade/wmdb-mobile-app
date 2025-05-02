import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React, { createContext, useContext } from 'react'

import { getPersonInsights } from '@/services/api/get-person-insights'
import { PersonInsightDetails } from '@/services/api/types'
import { PersonResponse } from '@/services/tmdb/models/person'
import { getPersonDetails } from '@/services/tmdb/person'

interface PersonContextData {
  details?: UseQueryResult<PersonResponse, AxiosError>
  insights?: UseQueryResult<PersonInsightDetails, AxiosError>
}

export const usePersonDetails = (id: string) => {
  return useQuery({
    queryKey: ['tmdb', 'person', id],
    queryFn: () => getPersonDetails(Number(id), 'pt-BR'),
    enabled: !!id,
  })
}

export const usePersonInsight = (id: string) => {
  return useQuery({
    queryKey: ['api', 'person', 'insights', id],
    queryFn: () => getPersonInsights({ personId: id }),
    enabled: !!id,
  })
}

const PersonContext = createContext<PersonContextData>({} as PersonContextData)

// This hook can be used to access the user info.
export function usePerson() {
  const value = useContext(PersonContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useApp must be wrapped in a <AppProvider />')
    }
  }

  return value
}

export function PersonProvider({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const details = usePersonDetails(id)
  const insights = usePersonInsight(id)

  return (
    <PersonContext.Provider
      value={{
        details,
        insights,
      }}
    >
      {children}
    </PersonContext.Provider>
  )
}
