import { Feather } from '@expo/vector-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import colors from 'tailwindcss/colors'

import { MovieHistoryListRef } from '@/components/MovieHistoryList'
import { roleMap, roleMapType } from '@/constants/utils'
import { queryClient } from '@/lib/react-query'
import { type FetchUseHistoryFilters } from '@/services/api/fetch-user-history'
import {
  findOrCreatePerson,
  FindOrCreatePersonRequest,
} from '@/services/api/find-or-create-person'
import { getPersonInsights } from '@/services/api/get-person-insights'
import { updatePerson, UpdatePersonRequest } from '@/services/api/update-person'
import { getPersonDetails } from '@/services/tmdb/person'
import { tmdbImage } from '@/utils/image'

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function PersonDetails() {
  const { personId: PersonTmdbId } = useLocalSearchParams()

  const movieHistoryListRef = useRef<MovieHistoryListRef>(null)
  const [displayMethod, setDisplayMethod] = useState<'LIST' | 'GRID'>('GRID')

  const [params, setParams] = useState<FetchUseHistoryFilters>(
    {} as FetchUseHistoryFilters,
  )

  function handleOpenFilterModal() {
    movieHistoryListRef.current?.openFilterModal()
  }

  const {
    data: personData,
    mutate: mutatePerson,
    isPending: isLoadingPersonData,
  } = useMutation({
    mutationFn: async (data: FindOrCreatePersonRequest) =>
      await findOrCreatePerson(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['api', 'stats'],
      })
      setParams((prev) => {
        return {
          ...prev,
          sort_by: 'watched_date.desc',
          person_id: data.id,
        }
      })
    },
  })

  const { data: personDetails } = useQuery({
    queryKey: ['tmdb', 'person', PersonTmdbId],
    queryFn: () => getPersonDetails(Number(PersonTmdbId), 'pt-BR'),
    enabled: !!PersonTmdbId,
  })

  const { data: personInsight } = useQuery({
    queryKey: ['api', 'person', 'insights', personData?.id],
    queryFn: () => getPersonInsights({ personId: personData!.id }),
    enabled: !!personData?.id,
  })

  useEffect(() => {
    if (personDetails) {
      mutatePerson({
        gender: personDetails.gender,
        profilePath: personDetails.profile_path,
        tmdbId: personDetails.id,
        name: personDetails.name,
      })
    }
  }, [personDetails, mutatePerson, PersonTmdbId])

  const updatePersonMutation = useMutation({
    mutationFn: async (data: UpdatePersonRequest) => await updatePerson(data),
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
          person_id: personData?.id,
        }
      })
    }
  }, [personData])

  return (
    <SafeAreaView
      className="bg-primary flex-1"
      style={{ paddingTop: androidPaddingCorrection }}
    >
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center my-4">
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
        </View>

        {/* Header */}
        <View className="flex-row  items-center mb-6">
          {personDetails?.profile_path && (
            <Image
              source={{
                uri: tmdbImage(personDetails.profile_path, 'w500'),
              }}
              className="w-20 h-20 rounded-full mr-4"
              alt=""
            />
          )}

          <View>
            <Text className="text-2xl text-white font-pbold">
              {personDetails?.name}
            </Text>
            {/* Movie Stats */}
            <View className="flex-row  mt-2 space-x-6">
              <View className="items-start">
                <Text className="text-gray-400 text-xs font-pregular">
                  Filmes
                </Text>
                <Text className="text-white text-lg font-pbold">
                  {personInsight?.movieCount}
                </Text>
              </View>
              <View className="items-start">
                <Text className="text-gray-400 text-xs font-pregular">
                  Média
                </Text>
                <Text className="text-white text-lg font-pbold">
                  {personInsight?.averageRating}
                </Text>
              </View>
              <View className="items-start">
                <Text className="text-gray-400 text-xs font-pregular">
                  Tempo Total:
                </Text>
                <Text className="text-white text-lg font-pbold">
                  {personInsight?.totalRuntime || 0} hrs
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Biography */}
        <View className="my-2">
          <Text className="text-white text-lg font-pbold mb-2">Biografia</Text>
          <Text
            numberOfLines={10}
            className="text-gray-400 text-xs font-pregular"
          >
            {personDetails?.biography || 'N/A'}
          </Text>
        </View>
        {personInsight && (
          <View>
            {personInsight.highestRated && (
              <View className="my-4 flex-col">
                <Text className="text-white text-lg font-pbold mb-2">
                  Melhor Filme
                </Text>

                <View className="flex-row items-center">
                  <Link
                    asChild
                    href={{
                      pathname: '/movie/[movieId]',
                      params: {
                        movieId: personInsight.highestRated.tmdbId,
                      },
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.7}>
                      <Image
                        source={{
                          uri: tmdbImage(
                            personInsight?.highestRated.posterPath,
                            'w154',
                          ),
                        }}
                        alt=""
                        className="w-16 h-24 rounded-md mr-4"
                      />
                    </TouchableOpacity>
                  </Link>
                  <View className="h-full">
                    <Text className="font-pbold  mb-2 text-white">
                      {personInsight.highestRated.title}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Média: {personInsight.highestRated.averageRating}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Duração: {personInsight.highestRated.runtime} min
                    </Text>
                    <Text className="font-pregular text-xs  text-gray-300">
                      {roleMap[personInsight.highestRated.role as roleMapType]}{' '}
                      / {personInsight.highestRated.character}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {personInsight.lowestRated && (
              <View className="mb-4">
                <Text className="text-white text-lg font-pbold mb-2">
                  Pior Filme
                </Text>

                <View className="flex-row items-center">
                  <Link
                    asChild
                    href={{
                      pathname: '/movie/[movieId]',
                      params: {
                        movieId: personInsight.lowestRated.tmdbId,
                      },
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.7}>
                      <Image
                        source={{
                          uri: tmdbImage(
                            personInsight?.lowestRated.posterPath,
                            'w154',
                          ),
                        }}
                        alt=""
                        className="w-16 h-24 rounded-md mr-4"
                      />
                    </TouchableOpacity>
                  </Link>
                  <View className="h-full">
                    <Text className="font-pbold mb-2 text-white">
                      {personInsight.lowestRated.title}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Média: {personInsight.lowestRated.averageRating}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Duração: {personInsight.lowestRated.runtime} min
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      {roleMap[personInsight.lowestRated.role as roleMapType]} /{' '}
                      {personInsight.lowestRated.character}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {personInsight.favoriteCompany && (
              <View className="mb-4">
                <Text className="text-white text-lg font-pbold mb-2">
                  Estúdio favorito
                </Text>
                <View className="flex-row items-center mt-1">
                  <Link
                    asChild
                    href={{
                      pathname: '/movies',
                      params: {
                        company_id: personInsight.favoriteCompany.id,
                        name: personInsight.favoriteCompany.name,
                      },
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.7}>
                      <Image
                        alt=""
                        resizeMode="contain"
                        className=" w-16 h-16 bg-white rounded-md p-1 mr-4"
                        source={{
                          uri: tmdbImage(
                            personInsight.favoriteCompany.logoPath,
                            'w500',
                          ),
                        }}
                      />
                    </TouchableOpacity>
                  </Link>
                  <View className="h-full">
                    <Text className="text-base text-white font-pregular">
                      {personInsight.favoriteCompany.name}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Total: {personInsight.favoriteCompany.count}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {personInsight.frequentCollaborators.length > 0 && (
              <View className="mb-6">
                <Text className="text-white text-lg font-pbold mb-2">
                  Colaboradores frequentes
                </Text>
                {personInsight.frequentCollaborators.map((c, index) => (
                  <Link
                    asChild
                    key={`${c.id}-${index}`}
                    href={{
                      pathname: '/person/[personId]',
                      params: {
                        personId: c.tmdbId,
                      },
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.7}>
                      <View className="flex-row items-center mb-3">
                        <Image
                          alt=""
                          source={{ uri: tmdbImage(c.profilePath, 'w154') }}
                          className="w-16 h-16 rounded-full mr-3"
                        />
                        <View>
                          <Text className="text-white font-pbold">
                            {c.name}
                          </Text>
                          <Text className="text-gray-200 text-xs">
                            {roleMap[c.role as roleMapType]} – {c.count} filmes
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Link>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
