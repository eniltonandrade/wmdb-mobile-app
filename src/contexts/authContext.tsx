import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { router } from 'expo-router'
import React, { createContext, useContext, useEffect } from 'react'
import Toast from 'react-native-toast-message'

import { api } from '@/services/api'
import { signInWithPassword } from '@/services/api/sign-in-with-password'

import { useStorageState } from '../hooks/useStorageState'

export type SignInCredentials = {
  email: string
  password: string
}

interface SessionContextData {
  signInWithCredentials: (credentials: SignInCredentials) => Promise<void>
  signUp: () => Promise<void>
  signOut: () => Promise<void>
  session: string | null
  isLoading: boolean
}

const AuthContext = createContext<SessionContextData>({} as SessionContextData)

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session')

  useEffect(() => {
    api.defaults.headers.common.Authorization = `Bearer ${session}`
  }, [session])

  const signInMutation = useMutation({
    mutationFn: async (data: SignInCredentials) =>
      await signInWithPassword(data),
    onSuccess: (token) => {
      setSession(token)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      router.replace('/home')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: error?.response?.data.message,
        })
      }
    },
  })

  async function signInWithCredentials(credentials: SignInCredentials) {
    try {
      signInMutation.mutate(credentials)
    } catch (error) {
      console.log(error)
    }
  }

  async function signOut() {
    setSession(null)
    router.replace('/')
  }

  async function signUp() {
    setSession(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signInWithCredentials,
        signOut,
        signUp,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
