import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

function handleError(error: Error) {
  if (isAxiosError(error) && error.response?.status === 401) {
    router.replace('/sign-in')
  }

  console.log(isAxiosError(error) && JSON.stringify(error.response?.data))
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'Algo deu errado, tente novamente mais tarde.',
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
