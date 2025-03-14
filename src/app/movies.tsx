import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useGlobalSearchParams } from 'expo-router/build/hooks'
import { useRef, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

import {
  MovieHistoryList,
  MovieHistoryListRef,
} from '@/components/MovieHistoryList'
import { Container } from '@/components/ui/Container'
import { type queryParams } from '@/services/api/fetch-user-history'

export default function Movies() {
  const { genre_id, name, company_id, release_year, watched_year } =
    useGlobalSearchParams<{
      genre_id?: string
      release_year?: string
      watched_year?: string
      company_id?: string
      name: string
      count: string
      average: string
    }>()

  const initialParams = {
    sort_by: 'watched_date.desc',
    ...Object.fromEntries(
      Object.entries({
        release_year,
        genre_id,
        company_id,
        watched_year,
      }).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value !== undefined,
      ),
    ),
  } as queryParams // Type assertion to satisfy TypeScript

  const movieHistoryListRef = useRef<MovieHistoryListRef>(null)
  const [displayMethod, setDisplayMethod] = useState<'LIST' | 'GRID'>('LIST')

  const [params, setParams] = useState<queryParams>(initialParams)

  function handleOpenFilterModal() {
    movieHistoryListRef.current?.openFilterModal()
  }

  function toggleViewMethod() {
    setDisplayMethod(displayMethod === 'GRID' ? 'LIST' : 'GRID')
  }

  return (
    <Container>
      <SafeAreaView className="flex-1">
        <View className="flex-row justify-between items-center px-4 my-4">
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPress={router.back}>
              <Feather name="arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text className="text-2xl text-white font-pbold ">{name}</Text>
          </View>
          <View className="flex-row space-x-4">
            <Pressable onPress={toggleViewMethod}>
              {displayMethod === 'GRID' && (
                <Ionicons name="list" size={22} color={colors.white} />
              )}

              {displayMethod === 'LIST' && (
                <MaterialIcons
                  name="grid-view"
                  size={22}
                  color={colors.white}
                />
              )}
            </Pressable>
            <Pressable onPress={handleOpenFilterModal}>
              <Ionicons name="options" size={22} color={colors.white} />
            </Pressable>
          </View>
        </View>
        <MovieHistoryList
          ref={movieHistoryListRef}
          displayMethod={displayMethod}
          selectedName={name}
          params={params}
          setParams={setParams}
        />
      </SafeAreaView>
    </Container>
  )
}
