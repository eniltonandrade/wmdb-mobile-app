import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast, { BaseToast } from 'react-native-toast-message'
import colors from 'tailwindcss/colors'

import { AppProvider } from '@/contexts/appContext'
import { SessionProvider } from '@/contexts/authContext'

import { queryClient } from '../lib/react-query'

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  })
  const toastConfig = {
    success: ({ ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: colors.green[500] }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: colors.gray[900],
        }}
        text1Style={{
          fontSize: 15,
          color: colors.gray[100],
        }}
      />
    ),
    error: ({ ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: colors.red[500] }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: colors.gray[900],
        }}
        text1Style={{
          fontSize: 15,
          color: colors.gray[100],
        }}
      />
    ),
  }

  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded) {
    return null
  }

  if (!fontsLoaded && !error) {
    return null
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <AppProvider>
              <Stack
                screenOptions={{
                  contentStyle: {
                    backgroundColor: colors.gray[900],
                  },
                  animation: 'ios_from_left',
                }}
              >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="person-details/[personId]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="stats/genres"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="stats/cast"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="stats/crew"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="stats/companies"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="stats/released-year"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="stats/watched-year"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="movies" options={{ headerShown: false }} />
              </Stack>
            </AppProvider>
          </SessionProvider>
        </QueryClientProvider>
        <Toast config={toastConfig} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
