import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { router } from 'expo-router'
import React, { createContext, useContext, useEffect } from 'react'
import Toast from 'react-native-toast-message'

import { queryClient } from '@/lib/react-query'
import { api } from '@/services/api'
import { createNewUser } from '@/services/api/create-new-user'
import { getUserProfile, User } from '@/services/api/get-user-profile'
import { signInWithPassword } from '@/services/api/sign-in-with-password'

import { useStorageState } from '../hooks/useStorageState'

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpData = {
  name: string
  email: string
  password: string
}

interface SessionContextData {
  signInWithCredentials: (credentials: SignInCredentials) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => Promise<void>
  session: string | null
  user?: User
  isLoading: boolean
  error: Error | null
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

  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(),
    enabled: !!session,
  })

  useEffect(() => {
    api.defaults.headers.common.Authorization = `Bearer ${session}`
  }, [session, userData])

  const { mutate: singUpMutate, isPending: isSignUpLoading } = useMutation({
    mutationFn: async (data: SignUpData) => await createNewUser(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Cadastro feito com sucesso!',
      })
      router.replace('/sign-in')
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

  const { mutate: singInMutate, isPending: isSignInLoading } = useMutation({
    mutationFn: async (data: SignInCredentials) =>
      await signInWithPassword(data),
    onSuccess: ({ access_token, refresh_token }) => {
      console.log(refresh_token)
      setSession(access_token)
      api.defaults.headers.common.Authorization = `Bearer ${access_token}`
      router.replace('/home')
    },
    onError: (error) => {
      console.log('ERROR', JSON.stringify(error))
      if (error instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: error?.response?.data.message || 'Erro ao tentar fazer login',
        })
      }
    },
  })

  async function signInWithCredentials(credentials: SignInCredentials) {
    try {
      singInMutate(credentials)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function signOut() {
    setSession(null)
    queryClient.invalidateQueries({
      queryKey: ['user'],
    })
    router.replace('/')
  }

  async function signUp(data: SignUpData) {
    singUpMutate(data)
  }

  return (
    <AuthContext.Provider
      value={{
        signInWithCredentials,
        signOut,
        signUp,
        error: userError,
        user: userData,
        session,
        isLoading:
          isLoading || isUserLoading || isSignInLoading || isSignUpLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
