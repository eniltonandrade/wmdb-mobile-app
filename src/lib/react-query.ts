import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

function showToastError() {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'Algo deu errado, tente novamente mais tarde.',
  })
}

function handleError(error: unknown) {
  if (!isAxiosError(error)) {
    console.log('Unexpected error:', error)
    showToastError()
    return
  }

  const status = error.response?.status
  const message = error.response?.data
  console.log(`ERROR|AXIOS|${status}|${JSON.stringify(message)}`)

  if (status === 401) {
    router.replace('/sign-in')
    return
  }

  if (status === 404) {
    return null
  }

  showToastError()
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
})
