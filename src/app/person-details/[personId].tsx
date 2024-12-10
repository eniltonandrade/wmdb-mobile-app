import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import {
  MovieHistoryList,
  MovieHistoryListRef,
} from '@/components/MovieHistoryList'
import { type queryParams } from '@/services/api/fetch-user-history'
import { getPersonByExternalId } from '@/services/api/get-person-by-external-id'
import { getPersonStats } from '@/services/api/get-person-stats'
import { getPersonDetails } from '@/services/tmdb/person'
import { tmdbImage } from '@/utils/image'

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function PersonDetails() {
  const { personId: PersonTmdbId } = useLocalSearchParams()

  const movieHistoryListRef = useRef<MovieHistoryListRef>(null)
  const [displayMethod, setDisplayMethod] = useState<'LIST' | 'GRID'>('GRID')

  const [params, setParams] = useState<queryParams>({} as queryParams)

  function handleOpenFilterModal() {
    movieHistoryListRef.current?.openFilterModal()
  }

  const { data: personData, isLoading: isLoadingPersonData } = useQuery({
    queryKey: ['api', 'history', PersonTmdbId],
    queryFn: () => getPersonByExternalId({ tmdbId: String(PersonTmdbId) }),
    enabled: !!PersonTmdbId,
  })

  const { data: personDetails } = useQuery({
    queryKey: ['tmdb', 'person', PersonTmdbId],
    queryFn: () => getPersonDetails(Number(PersonTmdbId), 'pt-BR'),
    enabled: !!PersonTmdbId,
  })

  const { data: personStats } = useQuery({
    queryKey: ['api', 'person', 'stats', personData?.person.id],
    queryFn: () => getPersonStats({ personId: personData?.person.id }),
    enabled: !!personData?.person.id,
  })

  function handleGoBack() {
    router.back()
  }

  useEffect(() => {
    if (personData?.person.id) {
      setParams((prev) => {
        return {
          ...prev,
          sort_by: 'watched_date.desc',
          personId: personData?.person.id,
        }
      })
    }
  }, [personData])

  function toggleViewMethod() {
    setDisplayMethod(displayMethod === 'GRID' ? 'LIST' : 'GRID')
  }

  return (
    <SafeAreaView
      className="bg-primary flex-1"
      style={{ paddingTop: androidPaddingCorrection }}
    >
      <View className="flex-row justify-between items-center px-4 my-4">
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity onPress={handleGoBack}>
            <Feather name="arrow-left" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text className="text-2xl text-white font-pbold ">
            {personData?.person.name}
          </Text>
        </View>
        <View className="flex-row space-x-4">
          <Pressable onPress={toggleViewMethod}>
            {displayMethod === 'GRID' && (
              <Ionicons name="list" size={22} color={colors.white} />
            )}

            {displayMethod === 'LIST' && (
              <MaterialIcons name="grid-view" size={22} color={colors.white} />
            )}
          </Pressable>
          <Pressable onPress={handleOpenFilterModal}>
            <Ionicons name="options" size={22} color={colors.white} />
          </Pressable>
        </View>
      </View>
      {!isLoadingPersonData && params.personId && (
        <MovieHistoryList
          ref={movieHistoryListRef}
          displayMethod={displayMethod}
          params={params}
          setParams={setParams}
          header={
            personDetails && (
              <View className="flex flex-row gap-4 px-2 mb-8">
                <View className="h-[160px] w-[120px] ">
                  <Image
                    source={{
                      uri: tmdbImage(personDetails.profile_path, 'w154'),
                    }}
                    className="rounded-md bg-gray-800 max-w-sm"
                    resizeMode={'cover'}
                    height={160}
                    alt={personDetails.name}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    numberOfLines={10}
                    className="text-white font-pregular text-xs"
                  >
                    Filmes Assistidos: {personStats?.person.count}
                  </Text>
                  <Text
                    numberOfLines={10}
                    className="text-white font-pregular text-xs"
                  >
                    Nota média: {personStats?.person.average}
                  </Text>
                </View>
              </View>
            )
          }
        />
      )}
    </SafeAreaView>
  )
}
