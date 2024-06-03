import { MoviesCarrousel } from '@/components/MoviesCarrousel'
import MoviesCarrouselSkeleton from '@/components/MoviesCarrouselSkeleton'
import { fetchUseHistory } from '@/services/api/fetch-user-history'
import { getTrendingMovies } from '@/services/tmdb/trending'
import { Feather } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Toast from 'react-native-toast-message'
import colors from 'tailwindcss/colors'

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function Home() {
  const {
    data: recentHistory,
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

  const { data: moviesTrending, isLoading: isMoviesTrendingLoading } = useQuery(
    {
      queryKey: ['tmdb', 'trending'],
      queryFn: () => getTrendingMovies('pt-BR', 'week'),
    },
  )

  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{ paddingTop: androidPaddingCorrection }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex my-6 space-y-4">
          <View className="flex justify-between items-start flex-row mb-6 px-4 ">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Bem Vindo,
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                Enilton Andrade
              </Text>
            </View>

            <View className="mt-1.5">
              <Image
                className="rounded-full"
                source={{ uri: 'https://github.com/eniltonandrade.png' }}
                height={50}
                width={50}
                alt="user avatar"
              />
            </View>
          </View>

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

          {recentHistory && !isRecentHistoryLoading ? (
            <MoviesCarrousel
              movies={recentHistory.results.map((history) => ({
                id: history.movie.id,
                tmdbId: history.movie.tmdbId,
                isWatched: true,
                posterPath: history.movie.posterPath,
                rating: history.movie.imdbRating,
                releaseDate: history.movie.releaseDate,
                title: history.movie.title,
                userRating: history.rating,
              }))}
              emptyListText="Seus filmes assistidos aparecerão aqui."
            />
          ) : (
            <MoviesCarrouselSkeleton />
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row w-full px-4 pb-4 "
          >
            <Text className="flex text-gray-100 text-lg font-pbold items-center justify-center">
              Em Alta
            </Text>
          </TouchableOpacity>

          {moviesTrending && !isMoviesTrendingLoading ? (
            <MoviesCarrousel
              movies={(moviesTrending?.results || []).map((movie) => ({
                tmdbId: movie.id,
                isWatched: false,
                posterPath: movie.poster_path,
                rating: movie.vote_average,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
                userRating: null,
              }))}
              emptyListText="Recomendações de filmes aparecerão aqui."
            />
          ) : (
            <MoviesCarrouselSkeleton />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
