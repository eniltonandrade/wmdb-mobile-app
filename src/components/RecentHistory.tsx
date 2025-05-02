import { Feather } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { MoviesCarrousel } from '@/components/MoviesCarrousel'
import MoviesCarrouselSkeleton from '@/components/MoviesCarrouselSkeleton'
import { fetchUseHistory } from '@/services/api/fetch-user-history'

import { Heading } from './ui/Heading'

export default function RecentHistory() {
  const { data, isLoading: isRecentHistoryLoading } = useQuery({
    queryKey: ['api', 'history'],
    queryFn: () =>
      fetchUseHistory({
        page: 1,
        params: {
          sort_by: 'watched_date.desc',
        },
      }),
  })

  return (
    <>
      <Link href="/(tabs)/history" asChild>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row w-full px-4 pb-4 "
        >
          <Heading size="lg">Recentes</Heading>

          <View className="flex items-center justify-center ml-2">
            <Feather name="arrow-right" size={16} color={colors.gray[100]} />
          </View>
        </TouchableOpacity>
      </Link>

      {data && !isRecentHistoryLoading ? (
        <MoviesCarrousel
          movies={data.histories.map((history) => ({
            id: history.movie?.id,
            tmdbId: history.movie?.tmdbId,
            isWatched: !!history.date,
            posterPath: history.movie?.posterPath,
            rating: history.movie?.averageRating,
            releaseDate: history.movie?.releaseDate,
            title: history.movie?.title,
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
