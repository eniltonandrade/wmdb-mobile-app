import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect } from 'react'

import { useStorageState } from '@/hooks/useStorageState'
import { fetchGenres } from '@/services/api/fetch-genres'

export type Genre = {
  id: string
  name: string
}

interface AppContextData {
  genres: Genre[]
  isLoading: boolean
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
  const [[isLoading, genres], setGenres] = useStorageState('genres')

  const { data: genresData } = useQuery({
    queryKey: ['genres'],
    queryFn: () => fetchGenres(),
  })

  useEffect(() => {
    setGenres(JSON.stringify(genresData))
  }, [genresData, setGenres])

  return (
    <AppContext.Provider
      value={{
        genres: JSON.parse(genres!),
        isLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
