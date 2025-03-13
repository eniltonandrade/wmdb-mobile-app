import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Link, router } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

import CastFiltersModal from '@/components/CastFilterModal'
import { Skeleton } from '@/components/Skeleton'
import Avatar from '@/components/ui/Avatar'
import { Container } from '@/components/ui/Container'
import FilterBadge from '@/components/ui/FilterBadge'
import { fetchCrewStats, QueryParams } from '@/services/api/fetch-crew-stats'
import { tmdbImage } from '@/utils/image'

type queryParamsKeys = keyof QueryParams

const sortMap = {
  count: 'Total',
  average: 'Nota Média',
}
const ratingMap = {
  imdb_rating: 'Nota IMDB',
  tmdb_rating: 'Nota TMDB',
  rotten_tomatoes_rating: 'Nota Rotten Tomatoes',
  metacritic_rating: 'Nota Metacritic',
}

type sortMapType = keyof typeof sortMap

export default function CrewStats() {
  const filterModalRef = useRef<BottomSheetModal>(null)
  const [params, setParams] = useState<QueryParams>({
    sort_by: 'count.desc',
    preferred_rating: 'imdb_rating',
    job: 'Director',
  })

  async function fetchCrewStatsFn({ pageParam }: { pageParam: number }) {
    const res = await fetchCrewStats({
      page: pageParam,
      params,
    })
    return res
  }

  const {
    data: crewsResult,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['api', 'stats', 'crew', ...Object.values(params)],
    queryFn: fetchCrewStatsFn,
    retry: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length < 20) return undefined
      return pages.length + 1
    },
  })

  const data = useMemo(() => {
    return crewsResult?.pages.map((page) => page.results).flat()
  }, [crewsResult])

  const total = useMemo(() => {
    return crewsResult?.pages.at(0)?.total
  }, [crewsResult])

  const getRatingColor = (average: number) => {
    if (average >= 7) return 'text-green-400'
    if (average >= 6.5) return 'text-yellow-400'
    return 'text-red-400'
  }

  function handleRemoveFilter(key: queryParamsKeys) {
    router.setParams({})
    setParams((prev) => {
      delete prev[key]
      return {
        ...prev,
      }
    })
  }

  function handleOpenFilterModal() {
    filterModalRef.current?.present()
  }

  const isFullyLoaded = total === data?.length

  const [selectedOrder, selectedDirection] = params.sort_by.split('.')

  return (
    <>
      <Container>
        <SafeAreaView className="flex-grow">
          <View className="px-4 flex-1">
            {/* Header */}
            <View className="flex flex-row items-center justify-between gap-2 my-4">
              <View className="flex flex-row items-center ">
                <TouchableOpacity onPress={() => router.back()}>
                  <Feather name="arrow-left" size={24} color={colors.white} />
                </TouchableOpacity>
                <Text className="ml-2 text-2xl text-white font-pbold ">
                  Diretores
                </Text>
              </View>
              <TouchableOpacity onPress={handleOpenFilterModal}>
                <Ionicons name="options" size={22} color={colors.white} />
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="bg-gray-900 flex-row py-1 px-2 rounded-md items-center space-x-2 mr-2 mb-4">
                  <Ionicons name="stats-chart-sharp" color={colors.white} />
                  <Text className=" font-pbold text-xs text-gray-100">
                    {total}
                  </Text>
                </View>
                {Object.keys(params).map((param) => {
                  return (
                    <View key={param}>
                      {param === 'preferred_rating' && (
                        <FilterBadge
                          onRemoval={() =>
                            handleRemoveFilter(param as queryParamsKeys)
                          }
                          text={params[param] && ratingMap[params[param]]}
                          removable={false}
                        />
                      )}
                      {param === 'gender' && (
                        <FilterBadge
                          onRemoval={() =>
                            handleRemoveFilter(param as queryParamsKeys)
                          }
                          text={params[param] === 1 ? 'Atrizes' : 'Atores'}
                          removable
                        />
                      )}
                      {param === 'sort_by' && (
                        <View className="bg-gray-900 flex-row rounded-md py-1 px-2 items-center space-x-2 mb-4 h-[26px]">
                          <MaterialCommunityIcons
                            name={
                              selectedDirection === 'asc'
                                ? 'sort-reverse-variant'
                                : 'sort-variant'
                            }
                            size={16}
                            color={colors.white}
                          />
                          <Text className=" font-pbold text-xs text-gray-100">
                            {sortMap[selectedOrder as sortMapType]}
                          </Text>
                        </View>
                      )}
                    </View>
                  )
                })}
              </ScrollView>
            </View>

            {/* Crew List */}
            {isLoading ? (
              <>
                <Skeleton className="w-full h-[80px] mb-4" />
                <Skeleton className="w-full h-[80px] mb-4" />
                <Skeleton className="w-full h-[80px] mb-4" />
                <Skeleton className="w-full h-[80px] mb-4" />
              </>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 32,
                }}
                ListFooterComponent={
                  !isFullyLoaded ? (
                    <ActivityIndicator
                      size="small"
                      className="mt-2"
                      color={colors.green[500]}
                    />
                  ) : (
                    <></>
                  )
                }
                renderItem={({ item, index }) => (
                  <Link
                    href={{
                      pathname: `/person-details/[personId]`,
                      params: {
                        personId: item.tmdbId,
                      },
                    }}
                    asChild
                    key={item.id}
                    className="bg-gray-900 rounded-lg p-4 my-2 flex-row justify-start items-center"
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="items-center"
                    >
                      <View className="flex-row item-center justify-center ">
                        <Text className="text-2xl font-pbold text-gray-100 pt-2 mr-2">
                          {index + 1}º
                        </Text>

                        <Avatar
                          size="sm"
                          uri={tmdbImage(item.profile_path, 'w500')}
                        />
                      </View>
                      <View className="flex-1 ml-4 flex-row justify-between items-center">
                        <View>
                          <Text className="text-white text-lg font-psemibold">
                            {item.name}
                          </Text>
                          {params.sort_by.startsWith('average') ? (
                            <Text className="text-gray-400 text-xs font-psemibold">
                              Filmes Assistidos: {item.count}
                            </Text>
                          ) : (
                            <Text className="text-gray-400 text-xs font-psemibold">
                              Média: {item.average}
                            </Text>
                          )}
                        </View>
                        {params.sort_by.startsWith('average') ? (
                          <Text
                            className={`text-xl font-bold ${getRatingColor(item.average)}`}
                          >
                            {item.average.toFixed(1)}
                          </Text>
                        ) : (
                          <Text className={`text-xl font-bold text-green-500`}>
                            {item.count}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  </Link>
                )}
              />
            )}
          </View>
        </SafeAreaView>
      </Container>

      <CastFiltersModal
        modalRef={filterModalRef}
        setParams={setParams}
        selectedFilters={params}
      />
    </>
  )
}
