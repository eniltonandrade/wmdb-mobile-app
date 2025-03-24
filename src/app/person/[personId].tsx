import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import Toast from 'react-native-toast-message'
import colors from 'tailwindcss/colors'

import {
  MovieHistoryList,
  MovieHistoryListRef,
} from '@/components/MovieHistoryList'
import { queryClient } from '@/lib/react-query'
import { type queryParams } from '@/services/api/fetch-user-history'
import {
  findOrCreatePerson,
  FindOrCreatePersonProps,
} from '@/services/api/find-or-create-person'
import { getPersonStats } from '@/services/api/get-person-stats'
import { updatePerson, UpdatePersonProps } from '@/services/api/update-person'
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

  const {
    data: personData,
    mutate: mutatePerson,
    isPending: isLoadingPersonData,
  } = useMutation({
    mutationFn: async (data: FindOrCreatePersonProps) =>
      await findOrCreatePerson(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['api', 'stats'],
      })
      setParams((prev) => {
        return {
          ...prev,
          sort_by: 'watched_date.desc',
          personId: data.id,
        }
      })
    },
  })

  const { data: personDetails } = useQuery({
    queryKey: ['tmdb', 'person', PersonTmdbId],
    queryFn: () => getPersonDetails(Number(PersonTmdbId), 'pt-BR'),
    enabled: !!PersonTmdbId,
  })

  const { data: personStats } = useQuery({
    queryKey: ['api', 'person', 'stats', personData?.id],
    queryFn: () => getPersonStats({ personId: personData?.id }),
    enabled: !!personData?.id,
  })

  useEffect(() => {
    if (personDetails) {
      mutatePerson({
        gender: personDetails.gender,
        profilePath: personDetails.profile_path,
        id: personDetails.id,
        name: personDetails.name,
      })
    }
  }, [personDetails, mutatePerson])

  const updatePersonMutation = useMutation({
    mutationFn: async (data: UpdatePersonProps) => await updatePerson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['api', 'stats'],
      })
      Toast.show({
        type: 'success',
        text1: 'Pessoa atualizada!',
      })
    },
  })

  async function handleUpdatePerson() {
    if (personDetails) {
      await updatePersonMutation.mutateAsync({
        tmdbId: personDetails.id,
        gender: personDetails.gender,
        name: personDetails.name,
        profilePath: personDetails?.profile_path,
      })
    }
  }

  function handleGoBack() {
    router.back()
  }

  useEffect(() => {
    if (personData?.id) {
      setParams((prev) => {
        return {
          ...prev,
          sort_by: 'watched_date.desc',
          personId: personData?.id,
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
          <TouchableOpacity
            onPress={handleGoBack}
            className="h-10 w-5 intems-center justify-center"
          >
            <Feather name="arrow-left" size={24} color={colors.white} />
          </TouchableOpacity>
          {/* <Text className="text-2xl text-white font-pbold ">
            {personDetails?.name}
          </Text> */}
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

      {!isLoadingPersonData && params.personId && personData && (
        <MovieHistoryList
          ref={movieHistoryListRef}
          displayMethod={displayMethod}
          params={params}
          setParams={setParams}
          header={
            personDetails && (
              <View className="flex-1">
                {/* Artist Info */}
                <View className="items-center">
                  <Image
                    source={{
                      uri: tmdbImage(personDetails.profile_path, 'w500'),
                    }}
                    className="w-32 h-32 rounded-full"
                    alt=""
                  />
                  <View className="flex-row items-center justify-center mt-4 space-x-4">
                    <Text className="text-white text-2xl font-pbold ">
                      {personDetails.name}
                    </Text>
                    {personData && (
                      <TouchableOpacity
                        onPress={handleUpdatePerson}
                        disabled={updatePersonMutation.isPending}
                      >
                        <Ionicons
                          name="refresh"
                          size={20}
                          color={
                            updatePersonMutation.isPending
                              ? colors.gray[800]
                              : colors.white
                          }
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View className="px-2 flex-row item-center justify-center space-x-2 mt-4">
                  <View className="bg-gray-900 rounded-lg  py-2 px-6">
                    <Text className="font-psemibold text-xs text-white">
                      {personStats?.person.count || 0} Filmes
                    </Text>
                  </View>
                  {personStats?.person.average && (
                    <View className="bg-gray-900 py-2 px-6 rounded-lg">
                      <Text className="font-psemibold text-xs text-white">
                        Média {personStats?.person.average || 0}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Biography */}
                <View className="bg-gray-900 p-4 rounded-lg my-6 mx-2">
                  <Text className="text-white text-lg font-pbold mb-2">
                    Biografia
                  </Text>
                  <Text
                    numberOfLines={10}
                    className="text-gray-400 text-xs font-pregular"
                  >
                    {personDetails.biography || 'N/A'}
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
