import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useInfiniteQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ScrollView, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { useApp } from '@/contexts/appContext'
import {
  fetchUseHistory,
  type FetchUseHistoryFilters,
} from '@/services/api/fetch-user-history'

import HistoryFiltersModal from './HistoryFiltersModal'
import Loading from './Loading'
import MovieActionsModal from './MovieActionsModal'
import MovieGrid from './MovieGrid'
import MovieList from './MovieList'
import FilterBadge from './ui/FilterBadge'

type queryParamsKeys = keyof FetchUseHistoryFilters

const sortMap = {
  rating_imdb: 'Nota IMDB',
  rating_tmdb: 'Nota TMDB',
  rating_rotten: 'Nota Rotten Tomatoes',
  rating_metacritic: 'Nota Metacritic',
  release_date: 'Data de Lançamento',
  watched_date: ' Por Histórico',
}

type sortMapType = keyof typeof sortMap

type MovieHistoryListProps = {
  params: FetchUseHistoryFilters
  displayMethod: 'LIST' | 'GRID'
  setParams: React.Dispatch<React.SetStateAction<FetchUseHistoryFilters>>
  header?: JSX.Element
  selectedName?: string
}
export type MovieHistoryListRef = {
  openFilterModal: () => void
}

const MovieHistoryList = forwardRef<MovieHistoryListRef, MovieHistoryListProps>(
  ({ params, setParams, displayMethod, header, selectedName }, ref) => {
    const filterModalRef = useRef<BottomSheetModal>(null)
    const movieActionsModalRef = useRef<BottomSheetModal>(null)

    const { genres } = useApp()
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>()

    async function fetchHistories({ pageParam }: { pageParam: number }) {
      const res = await fetchUseHistory({
        page: pageParam,
        filters: params,
      })
      return res
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

    function handleOpenMovieActionsModal(id: string) {
      setSelectedMovieId(id)
      movieActionsModalRef.current?.present()
    }

    function handleOpenFilterModal() {
      filterModalRef.current?.present()
    }

    useImperativeHandle(ref, () => ({
      openFilterModal: handleOpenFilterModal,
    }))

    function handleRemoveFilter(key: queryParamsKeys) {
      router.setParams({})
      setParams((prev) => {
        delete prev[key]
        return {
          ...prev,
        }
      })
    }

    const histories = useMemo(() => {
      return data?.pages.map((page) => page.histories).flat()
    }, [data])

    const total = useMemo(() => {
      return data?.pages.at(0)?.total
    }, [data])

    const selectedParamKeys = Object.keys(params).filter((p) => p !== 'sort_by')
    const [selectedOrder, selectedDirection] = params.sort_by.split('.')

    if (isLoading && !data) {
      return <Loading />
    }

    console.log(params)

    return (
      <>
        {selectedParamKeys && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pl-4"
            >
              <FilterBadge
                text={`${total} Filmes`}
                onPress={handleOpenFilterModal}
                Icon={
                  <Ionicons name="stats-chart-sharp" color={colors.white} />
                }
              />

              {Object.keys(params).map((param) => {
                return (
                  <View key={param}>
                    {param === 'genre_id' && (
                      <FilterBadge
                        Icon={<Ionicons name="filter" color={colors.white} />}
                        removable={true}
                        onPress={handleOpenFilterModal}
                        onRemoval={() =>
                          handleRemoveFilter(param as queryParamsKeys)
                        }
                        text={
                          genres.find(
                            (genre) =>
                              genre.id === params[param as queryParamsKeys],
                          )?.name
                        }
                      />
                    )}
                    {param === 'company_id' && (
                      <FilterBadge
                        Icon={<Ionicons name="filter" color={colors.white} />}
                        removable={true}
                        onPress={handleOpenFilterModal}
                        onRemoval={() =>
                          handleRemoveFilter(param as queryParamsKeys)
                        }
                        text={selectedName}
                      />
                    )}
                    {param === 'sort_by' && (
                      <FilterBadge
                        onPress={handleOpenFilterModal}
                        Icon={
                          <MaterialCommunityIcons
                            name={
                              selectedDirection === 'asc'
                                ? 'sort-reverse-variant'
                                : 'sort-variant'
                            }
                            size={16}
                            color={colors.white}
                          />
                        }
                        text={sortMap[selectedOrder as sortMapType]}
                      />
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
              openMovieActions={handleOpenMovieActionsModal}
              items={histories}
              isFullyLoaded={total === histories.length}
              listHeader={header}
            />
          )}

          {histories && displayMethod === 'LIST' && (
            <MovieList
              fetchNextPage={fetchNextPage}
              openMovieActions={handleOpenMovieActionsModal}
              isFullyLoaded={total === histories.length}
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
      </>
    )
  },
)

MovieHistoryList.displayName = 'MovieHistoryList'

export { MovieHistoryList }
