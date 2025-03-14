import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useRef, useState } from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'
import colors from 'tailwindcss/colors'

import {
  MovieHistoryList,
  MovieHistoryListRef,
} from '@/components/MovieHistoryList'
import { Container } from '@/components/ui/Container'
import { type queryParams } from '@/services/api/fetch-user-history'

export default function History() {
  const movieHistoryListRef = useRef<MovieHistoryListRef>(null)
  const [displayMethod, setDisplayMethod] = useState<'LIST' | 'GRID'>('LIST')

  const [params, setParams] = useState<queryParams>({
    sort_by: 'watched_date.desc',
  })

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
          <View>
            <Text className="text-2xl text-white font-pbold ">History</Text>
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
          params={params}
          setParams={setParams}
        />
      </SafeAreaView>
    </Container>
  )
}
