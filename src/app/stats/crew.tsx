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

import FilterSelectionModal from '@/components/filtering/FilterSelectionModal'
import OrderSelectionModal from '@/components/filtering/OrderSelectionModal'
import { Skeleton } from '@/components/Skeleton'
import Avatar from '@/components/ui/Avatar'
import { Container } from '@/components/ui/Container'
import FilterBadge from '@/components/ui/FilterBadge'
import {
  GENDER_OPTIONS,
  genderMap,
  RATING_SOURCES_OPTIONS,
  ratingSourceMap,
  sortMap,
  sortMapType,
} from '@/constants/utils'
import {
  fetchCrewStats,
  PreferredRatingType,
  QueryParams,
  SortType,
} from '@/services/api/fetch-crew-stats'
import { tmdbImage } from '@/utils/image'

export default function CrewStats() {
  const ratingSelectionModalRef = useRef<BottomSheetModal>(null)
  const orderSelectionModalRef = useRef<BottomSheetModal>(null)
  const genderSelectionModalRef = useRef<BottomSheetModal>(null)
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

  function handleRatingSourceChange(key: string) {
    setParams((prev) => {
      return {
        ...prev,
        preferred_rating: key as PreferredRatingType,
      }
    })
    ratingSelectionModalRef.current?.close()
  }

  function handleOrderDirectionChange(direction: string, key: string) {
    const sortBy = (key + '.' + direction) as SortType
    setParams((prev) => {
      return {
        ...prev,
        sort_by: sortBy,
      }
    })
    orderSelectionModalRef.current?.close()
  }

  function handleGenderChange(id: string) {
    if (id === 'todos') {
      setParams((prev) => {
        delete prev.gender
        return {
          ...prev,
        }
      })
    } else {
      setParams((prev) => {
        return {
          ...prev,
          gender: Number(id),
        }
      })
    }

    genderSelectionModalRef.current?.close()
  }

  function handleOpenRatingSourceSelectionModal() {
    ratingSelectionModalRef.current?.present()
  }
  function handleOpenOrderSelectionModal() {
    orderSelectionModalRef.current?.present()
  }

  function handleOpenGenderSelectionModal() {
    genderSelectionModalRef.current?.present()
  }

  const isFullyLoaded = total === data?.length

  const [selectedItem, selectedOrder] = params.sort_by.split('.')

  const selectedGender = params.gender ? params.gender : 'todos'

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
            </View>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FilterBadge
                  text={`${total} Items`}
                  removable={false}
                  Icon={
                    <Ionicons name="stats-chart-sharp" color={colors.white} />
                  }
                />
                <FilterBadge
                  text={sortMap[selectedItem as sortMapType]}
                  onPress={handleOpenOrderSelectionModal}
                  Icon={
                    <MaterialCommunityIcons
                      name={
                        selectedOrder === 'asc'
                          ? 'sort-reverse-variant'
                          : 'sort-variant'
                      }
                      size={16}
                      color={colors.white}
                    />
                  }
                />
                <FilterBadge
                  text={ratingSourceMap[params.preferred_rating]}
                  removable={false}
                  onPress={handleOpenRatingSourceSelectionModal}
                  Icon={<Ionicons name="star" color={colors.white} />}
                />
                <FilterBadge
                  text={genderMap[selectedGender]}
                  removable={false}
                  onPress={handleOpenGenderSelectionModal}
                  Icon={<Ionicons name="person" color={colors.white} />}
                />
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
                          uri={tmdbImage(item.profile_path, 'w154')}
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
                              Média: {item.average.toFixed(1)}
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
      <OrderSelectionModal
        currentSelection={params.sort_by}
        modalRef={orderSelectionModalRef}
        onChange={handleOrderDirectionChange}
      />
      <FilterSelectionModal
        filterTitle="Gênero"
        modalRef={genderSelectionModalRef}
        currentSelection={selectedGender}
        onChange={handleGenderChange}
        items={GENDER_OPTIONS}
      />
      <FilterSelectionModal
        filterTitle="Notas por:"
        currentSelection={params.preferred_rating}
        modalRef={ratingSelectionModalRef}
        onChange={handleRatingSourceChange}
        items={RATING_SOURCES_OPTIONS}
      />
    </>
  )
}
