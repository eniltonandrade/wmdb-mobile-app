import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { MoviesCarrousel } from '@/components/MoviesCarrousel'
import { useQuery } from '@tanstack/react-query'
import { fetchUseHistory } from '@/services/api/fetch-user-history'
import Toast from 'react-native-toast-message'
import colors from 'tailwindcss/colors'
import MoviesCarrouselSkeleton from '@/components/MoviesCarrouselSkeleton'

export default function RecentHistory() {
  const {
    data,
    isLoading: isRecentHistoryLoading,
    error: recentHistoryError,
  } = useQuery({
    queryKey: ['api', 'history'],
    queryFn: () =>
      fetchUseHistory({
        page: 1,
        sort_by: 'watched_date.desc',
      }),
  })

  useEffect(() => {
    if (recentHistoryError) {
      Toast.show({
        type: 'error',
        text1: `Erro`,
        text2: `Não foi possível acessar a API.`,
      })
    }
  }, [recentHistoryError])
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row w-full px-4 pb-4 "
      >
        <Text className="flex text-gray-100 text-lg font-pbold items-center justify-center">
          Recentes
        </Text>
        <View className="flex items-center justify-center ml-2">
          <Feather name="arrow-right" size={16} color={colors.gray[100]} />
        </View>
      </TouchableOpacity>

      {data && !isRecentHistoryLoading ? (
        <MoviesCarrousel
          movies={data.histories.map((history) => ({
            id: history.movie.id,
            tmdbId: history.movie.tmdbId,
            isWatched: !!history.date,
            posterPath: history.movie.posterPath,
            rating: history.movie.tmdbRating,
            releaseDate: history.movie.releaseDate,
            title: history.movie.title,
            userRating: history.rating,
          }))}
          emptyListText="Seus filmes assistidos aparecerão aqui."
        />
      ) : (
        <MoviesCarrouselSkeleton />
      )}
    </>
  )
}
