import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import React, { createContext, useContext } from 'react'

import { getUserProfile } from '@/services/api/get-user-profile'

export type User = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  preferredRating: string | null
}

interface UserContextData {
  user?: User
  loadUserData: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<User, Error>>
  error: Error | null
  isLoading: boolean
}

const UserContext = createContext<UserContextData>({} as UserContextData)

// This hook can be used to access the user info.
export function useUser() {
  const value = useContext(UserContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useUser must be wrapped in a <UserProvider />')
    }
  }

  return value
}

export function UserProvider(props: React.PropsWithChildren) {
  const {
    data: user,
    refetch: loadUserData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
  })

  return (
    <UserContext.Provider
      value={{
        user,
        loadUserData,
        error,
        isLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
