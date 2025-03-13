import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

function handleError(error: Error) {
  const errorMessage = isAxiosError(error)
    ? error?.response?.data.message
    : 'Não foi possível acessar a API'

  if (isAxiosError(error) && error.response?.status === 401) {
    router.replace('/sign-in')
  }

  console.log(isAxiosError(error) && error.response?.data)
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: errorMessage,
  })
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
})
