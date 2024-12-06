import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { healthCheck } from '@/services/api/health-check'

export type Genre = {
  id: string
  name: string
}

interface AppContextData {
  genres: Genre[]
  appStatus: boolean
  appError: Error | null
  appHealthLoading: boolean
}

const AppContext = createContext<AppContextData>({} as AppContextData)

// This hook can be used to access the user info.
export function useApp() {
  const value = useContext(AppContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useApp must be wrapped in a <AppProvider />')
    }
  }

  return value
}

export function AppProvider(props: React.PropsWithChildren) {
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    getGenres()
  }, [])

  function getGenres() {
    setGenres([
      {
        id: 'b62cb94e-62b9-4308-80e2-a7dcf222d21c',
        name: 'Ação',
      },
      {
        id: '5b75562d-4dcb-415f-9125-07829b002417',
        name: 'Drama',
      },
      {
        id: 'dd7f585d-faaf-4986-934a-161c7132a50e',
        name: 'Thriller',
      },
      {
        id: 'd65ccc9a-6163-4a23-bc90-906e86786248',
        name: 'Aventura',
      },
      {
        id: 'c3745f58-d9c5-49bd-a45b-397c0fa9d6c1',
        name: 'Comédia',
      },
      {
        id: '8bab32a4-ab48-4963-9e81-73aa95ce3799',
        name: 'Ficção científica',
      },
      {
        id: 'df982efb-e297-4841-8118-8ddcfac1c5de',
        name: 'Crime',
      },
      {
        id: '9da6364e-9935-4585-95cc-ae043541e163',
        name: 'Fantasia',
      },
      {
        id: '51680e69-2b9a-4a34-92f4-cd35a193581d',
        name: 'Família',
      },
      {
        id: 'f743f81c-e5f4-42d4-a697-812115c3cde4',
        name: 'Mistério',
      },
      {
        id: 'a1f1e41a-2251-4588-bba1-9c2a22c09134',
        name: 'Animação',
      },
      {
        id: 'a928387d-0b16-48dc-b155-8e3704360bb6',
        name: 'Romance',
      },
      {
        id: 'd659d8e4-031e-4936-8aa4-adbe1a178def',
        name: 'História',
      },
      {
        id: 'd6a9054c-c79d-46a4-b7df-c4dab10c044f',
        name: 'Terror',
      },
      {
        id: 'b781ba64-671f-46e9-8f97-1fa07b5ce39a',
        name: 'Guerra',
      },
      {
        id: '91ca7e01-b185-4ab2-8f89-0fb1ad0f6b8f',
        name: 'Faroeste',
      },
      {
        id: '9cdfa982-5f38-4034-b48f-ca82911f3065',
        name: 'Música',
      },
      {
        id: '90a4d253-17fa-433f-975d-32ed1a7dae5e',
        name: 'Cinema TV',
      },
      {
        id: '488ee650-403d-4746-b1da-e79732d1e599',
        name: 'Documentário',
      },
    ])
  }

  const {
    data,
    error,
    isLoading: appHealthLoading,
  } = useQuery({
    queryKey: ['health'],
    queryFn: () => healthCheck(),
    gcTime: 0,
  })

  return (
    <AppContext.Provider
      value={{
        genres,
        appStatus: data,
        appError: error,
        appHealthLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
