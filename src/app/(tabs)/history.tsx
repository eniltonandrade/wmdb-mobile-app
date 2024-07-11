import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useInfiniteQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import HistoryFiltersModal from '@/components/HistoryFiltersModal'
import Loading from '@/components/Loading'
import MovieActionsModal from '@/components/MovieActionsModal'
import MovieGrid from '@/components/MovieGrid'
import MovieList from '@/components/MovieList'
import { useApp } from '@/contexts/appContext'
import {
  fetchUseHistory,
  type queryParams,
} from '@/services/api/fetch-user-history'

type queryParamsKeys = keyof queryParams

const sortMap = {
  rating_imdb: 'Nota IMDB',
  rating_tmdb: 'Nota TMDB',
  rating_rotten: 'Nota Rotten Tomatoes',
  rating_metacritic: 'Nota Metacritic',
  release_date: 'Data de Lançamento',
  watched_date: ' Por Histórico',
}

type sortMapType = keyof typeof sortMap

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function History() {
  const { genres } = useApp()
  const filterModalRef = useRef<BottomSheetModal>(null)
  const movieActionsModalRef = useRef<BottomSheetModal>(null)
  const [displayMethod, setDisplayMethod] = useState<'LIST' | 'GRID'>('LIST')
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>()

  const [params, setParams] = useState<queryParams>({
    sort_by: 'watched_date.desc',
  })

  async function fetchHistories({ pageParam }: { pageParam: number }) {
    const res = await fetchUseHistory({
      page: pageParam,
      params,
    })
    return res
  }

  function handleRemoveFilter(key: queryParamsKeys) {
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

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['api', 'history', ...Object.values(params)],
    queryFn: fetchHistories,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.histories.length < 20) return undefined
      return pages.length + 1
    },
  })

  const histories = useMemo(() => {
    return data?.pages.map((page) => page.histories).flat()
  }, [data])

  const total = useMemo(() => {
    return data?.pages.at(0)?.total
  }, [data])

  function handleNavigate(id: number) {
    router.setParams({ id: String(id) })
    router.push(`/movie/${id}`)
  }

  function toggleViewMethod() {
    setDisplayMethod(displayMethod === 'GRID' ? 'LIST' : 'GRID')
  }

  function handleOpenMovieActionsModal(id: string) {
    setSelectedMovieId(id)
    movieActionsModalRef.current?.present()
  }

  if (isLoading) {
    return <Loading />
  }

  const selectedParamKeys = Object.keys(params).filter((p) => p !== 'sort_by')
  const [selectedOrder, selectedDirection] = params.sort_by.split('.')

  return (
    <SafeAreaView
      className="bg-primary flex-1"
      style={{ paddingTop: androidPaddingCorrection }}
    >
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
              <MaterialIcons name="grid-view" size={22} color={colors.white} />
            )}
          </Pressable>
          <Pressable onPress={handleOpenFilterModal}>
            <Ionicons name="options" size={22} color={colors.white} />
          </Pressable>
        </View>
      </View>
      {selectedParamKeys && (
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="bg-gray-800 flex-row py-1 px-2 rounded-md items-center space-x-2 ml-4 mb-4">
              <Ionicons name="stats-chart-sharp" color={colors.white} />
              <Text className=" font-pbold text-xs text-gray-100">{total}</Text>
            </View>
            {Object.keys(params).map((param) => {
              return (
                <View key={param}>
                  {param === 'genre_id' && (
                    <View className="bg-gray-800 flex-row py-1 px-2 rounded-md items-center space-x-2 ml-2 mb-4 ">
                      <Ionicons name="filter" color={colors.white} />
                      <Text className=" font-pbold text-xs text-gray-100">
                        {
                          genres.find(
                            (genre) =>
                              genre.id === params[param as queryParamsKeys],
                          )?.name
                        }
                      </Text>
                      <Pressable
                        className="bg-gray-900 rounded-md"
                        onPress={() =>
                          handleRemoveFilter(param as queryParamsKeys)
                        }
                      >
                        <Ionicons name="close" size={18} color={colors.white} />
                      </Pressable>
                    </View>
                  )}
                  {param === 'sort_by' && (
                    <View className="bg-gray-800 flex-row py-1 px-2 rounded-md items-center space-x-2 ml-2 mb-4 ">
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
      )}
      <View className="w-full px-2 flex-1 ">
        {histories && displayMethod === 'GRID' && (
          <MovieGrid
            fetchNextPage={fetchNextPage}
            handleNavigate={handleNavigate}
            openMovieActions={handleOpenMovieActionsModal}
            items={histories}
          />
        )}

        {histories && displayMethod === 'LIST' && (
          <MovieList
            fetchNextPage={fetchNextPage}
            openMovieActions={handleOpenMovieActionsModal}
            handleNavigate={handleNavigate}
            items={histories}
          />
        )}
      </View>
      <HistoryFiltersModal
        modalRef={filterModalRef}
        setParams={setParams}
        selectedFilters={params}
      />
      <MovieActionsModal
        modalRef={movieActionsModalRef}
        movieId={selectedMovieId}
      />
    </SafeAreaView>
  )
}
