import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Link, router } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import FilterSelectionModal from '@/components/filtering/FilterSelectionModal'
import OrderSelectionModal from '@/components/filtering/OrderSelectionModal'
import { Skeleton } from '@/components/Skeleton'
import { Container } from '@/components/ui/Container'
import FilterBadge from '@/components/ui/FilterBadge'
import {
  AGGREGATION_SORTING_OPTIONS,
  RATING_SOURCES_OPTIONS,
  ratingSourceMap,
  sortMap,
  sortMapType,
} from '@/constants/utils'
import { SortType } from '@/services/api/fetch-cast-stats'
import {
  fetchGenreStats,
  PreferredRatingType,
  QueryParams,
} from '@/services/api/fetch-genre-stats'

export default function GenreStats() {
  const orderSelectionModalRef = useRef<BottomSheetModal>(null)
  const ratingSelectionModalRef = useRef<BottomSheetModal>(null)

  const [params, setParams] = useState<QueryParams>({
    sort_by: 'count.desc',
    preferred_rating: 'imdb_rating',
  })

  async function fetchGenreStatsFn({ pageParam }: { pageParam: number }) {
    const res = await fetchGenreStats({
      page: pageParam,
      params,
    })
    return res
  }

  const {
    data: genreData,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['api', 'stats', 'genres', ...Object.values(params)],
    queryFn: fetchGenreStatsFn,
    retry: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length < 20) return undefined
      return pages.length + 1
    },
  })

  const data = useMemo(() => {
    return genreData?.pages.map((page) => page.results).flat()
  }, [genreData])

  const total = useMemo(() => {
    return genreData?.pages.at(0)?.total
  }, [genreData])

  const getRatingColor = (average: number) => {
    if (average >= 7) return 'text-green-400'
    if (average >= 6.5) return 'text-yellow-400'
    return 'text-red-400'
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

  function handleRatingSourceChange(key: string) {
    setParams((prev) => {
      return {
        ...prev,
        preferred_rating: key as PreferredRatingType,
      }
    })
    ratingSelectionModalRef.current?.close()
  }

  function handleOpenOrderSelectionModal() {
    orderSelectionModalRef.current?.present()
  }

  function handleOpenRatingSourceSelectionModal() {
    ratingSelectionModalRef.current?.present()
  }

  const isFullyLoaded = total === data?.length

  const [selectedItem, selectedOrder] = params.sort_by.split('.')

  return (
    <Container>
      <SafeAreaView className="flex-grow">
        <View className="px-4 mt-4 flex-1">
          {/* Header */}
          <View className="flex flex-row items-center gap-2 mb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center"
            >
              <Feather name="arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text className="text-2xl text-white font-pbold ">Gêneros</Text>
          </View>

          {isLoading ? (
            <Skeleton className="w-[200px] h-[16px] my-4" />
          ) : (
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FilterBadge
                  text={`${total} Gêneros`}
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
              </ScrollView>
            </View>
          )}

          {/* Company List */}
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
              ListFooterComponent={
                <>
                  {!isFullyLoaded && (
                    <ActivityIndicator
                      size="small"
                      className="mt-2"
                      color={colors.green[500]}
                    />
                  )}
                </>
              }
              contentContainerStyle={{
                paddingBottom: 32,
              }}
              renderItem={({ item, index }) => (
                <Link
                  href={{
                    pathname: '/movies',
                    params: {
                      genre_id: item.id,
                      name: item.name,
                      count: item.count,
                      average: item.average,
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
                      <Text className="text-2xl font-pbold text-gray-100 pt-2 mr-2 min-w-[40px]">
                        {index + 1}º
                      </Text>
                    </View>
                    <View className="flex-1 ml-4 flex-row justify-between items-center">
                      <View className="max-w-[180px]">
                        <Text
                          className="text-white text-lg font-psemibold "
                          numberOfLines={2}
                        >
                          {item.name}
                        </Text>

                        {selectedItem === 'average' ? (
                          <Text className="text-gray-400 text-xs font-psemibold">
                            Filmes Assistidos: {item.count}
                          </Text>
                        ) : (
                          <Text className="text-gray-400 text-xs font-psemibold">
                            Média: {item.average.toFixed(1)}
                          </Text>
                        )}
                      </View>

                      {selectedItem === 'average' ? (
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
      <OrderSelectionModal
        currentSelection={params.sort_by}
        modalRef={orderSelectionModalRef}
        onChange={handleOrderDirectionChange}
        items={AGGREGATION_SORTING_OPTIONS}
      />
      <FilterSelectionModal
        filterTitle="Notas por:"
        currentSelection={params.preferred_rating}
        modalRef={ratingSelectionModalRef}
        onChange={handleRatingSourceChange}
        items={RATING_SOURCES_OPTIONS}
      />
    </Container>
  )
}
