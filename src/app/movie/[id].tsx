import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import { getMovieDetails } from '@/services/tmdb/movies'
import { useMutation, useQuery } from '@tanstack/react-query'
import { tmdbImage } from '@/utils/image'

import ImdbLogo from '@/assets/icons/imdb_logo.svg'
import TmdbLogo from '@/assets/icons/tmdb_logo.svg'
import Metacritic from '@/assets/icons/metacritic_logo.svg'
import Tomatoes from '@/assets/icons/tomatometer-aud_score-fresh.svg'
import Animated, { FadeInDown, useSharedValue } from 'react-native-reanimated'
import { getMovieByExternalId } from '@/services/api/get-movie-by-external-id'
import { getUserHistoryByMovieId } from '@/services/api/get-user-history-by-movie'
import { getImdbMovieDetails } from '@/services/omdb/get-imdb-movie-details'

import { CastModal } from './_components/CastModal'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import Toast from 'react-native-toast-message'
import { Skeleton } from '@/components/Skeleton'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import AnimatedHeader from '@/components/AnimatedHeader'
import AddToHistoryModal from './_components/AddToHistoryModal'
import Loading from '@/components/Loading'
import UserActions from './_components/UserActions'
import {
  AddMovieToHistoryProps,
  addMovieToUserHistory,
} from '@/services/api/add-movie-to-user-history'

import { queryClient } from '@/lib/react-query'
import UserRatingModal from './_components/UserRatingModal'

const mapper: Record<string, React.ReactNode> = {
  'Internet Movie Database': <ImdbLogo height={24} width={24} />,
  'Rotten Tomatoes': <Tomatoes height={24} width={24} />,
  Metacritic: <Metacritic height={24} width={24} />,
}

/*
    TODO: Descobrir um jeito de fechar o modal historico depois que a nota foi salva
    TODO: Mostrar nota quando user setar nota
    TODO: Esconder ícone de adicionar a lista quando filme já foi assistido
*/

export default function Movie() {
  const [watchedDate, setWatchedDate] = useState<Date | null>(null)
  const castModalRef = useRef<BottomSheetModal>(null)
  const addToHistoryModalRef = useRef<BottomSheetModal>(null)
  const userRatingModalRef = useRef<BottomSheetModal>(null)
  const { id } = useLocalSearchParams()

  const scrollY = useSharedValue<number>(0.5)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y
    scrollY.value = offsetY
  }

  const { data: movie, isLoading: isMovieLoading } = useQuery({
    queryKey: ['tmdb', id],
    queryFn: () => getMovieDetails(Number(id), 'pt-BR'),
    enabled: !!id,
  })

  const { data: storedMovie, isLoading: isStoredMovieLoading } = useQuery({
    queryKey: ['api', 'movie', id],
    queryFn: () =>
      getMovieByExternalId({ movieId: id!.toString(), tmdb: true }),
    enabled: !!id,
  })

  const {
    data: history,
    error: historyError,
    status: historyStatus,
  } = useQuery({
    queryKey: ['api', 'history', storedMovie?.result?.id],
    queryFn: () =>
      getUserHistoryByMovieId({ movieId: storedMovie?.result?.id }),
    enabled: !!storedMovie?.result?.id,
  })

  const { data: omdbData } = useQuery({
    queryKey: ['omdb', 'movie', movie?.imdb_id],
    queryFn: () => getImdbMovieDetails(movie?.imdb_id),
    enabled: !!movie?.imdb_id,
  })

  const addToHistoryMutation = useMutation({
    mutationFn: async (data: AddMovieToHistoryProps) =>
      await addMovieToUserHistory(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['api', 'history'],
      }),
  })

  useEffect(() => {
    if (historyStatus === 'success' && history && history.date) {
      setWatchedDate(new Date(history.date))
    }
  }, [history, historyStatus])

  function handleOpenCastModal() {
    castModalRef.current?.present()
  }

  function handleOpenAddToHistoryModal() {
    addToHistoryModalRef.current?.present()
  }

  function handleOpenUserRatingModal() {
    userRatingModalRef.current?.present()
  }

  async function handleAddToMovieToUserHistory(date: Date) {
    setWatchedDate(date)
    await addToHistoryMutation.mutateAsync({
      movie: movie!,
      ratings: omdbData?.Ratings,
      watchedDate: date,
    })
    addToHistoryModalRef.current?.close()
    userRatingModalRef.current?.present()
  }

  useEffect(() => {
    if (historyError) {
      console.log(historyError)
      Toast.show({
        type: 'error',
        text1: `Ops.`,
        text2: `Algo deu errado, tente novamente mais tarde.`,
      })
    }
  }, [historyError])

  useEffect(() => {
    if (addToHistoryMutation.error) {
      console.log(addToHistoryMutation.error)
      Toast.show({
        type: 'error',
        text1: `Ops.`,
        text2: `Erro ao adicionar filme.`,
      })
    }
  }, [addToHistoryMutation.error])

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: 'This is some something 👋',
    })
  }

  function handleGoBack() {
    router.back()
  }

  if (!movie) {
    return <Loading />
  }

  return (
    <>
      <AnimatedHeader
        scrollY={scrollY}
        title={movie?.title || 'loading'}
        goBack={handleGoBack}
        rightButton={
          <TouchableOpacity>
            <Feather name="bookmark" size={24} color={colors.white} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="flex-grow bg-primary"
      >
        {!isMovieLoading && movie && (
          <View className="flex-1 w-full">
            {/* Top Header */}
            <ImageBackground
              className="w-full h-[200px]"
              resizeMode="cover"
              source={{
                uri: tmdbImage(movie.backdrop_path, 'w500'),
              }}
              alt={movie?.title}
            >
              <View className="z-50 top-4 mx-4 flex flex-row justify-between items-center mt-8">
                <TouchableOpacity onPress={handleGoBack}>
                  <Feather name="arrow-left" size={24} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="bookmark" size={24} color={colors.white} />
                </TouchableOpacity>
              </View>
              <LinearGradient
                colors={['rgba(4, 0, 25, 0)', '#030712']}
                className="absolute z-0 w-full top-0 h-[200px]"
              />
            </ImageBackground>
            {/* Movie Title and Details */}
            <View className="mx-4 -mt-20 flex-row space-x-4">
              <Animated.View entering={FadeInDown.duration(600)}>
                <Image
                  source={{
                    uri: tmdbImage(movie.poster_path!, 'w154'),
                  }}
                  alt={movie?.title}
                  resizeMode="cover"
                  className="w-[120px] h-[180px] rounded-md "
                />
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(400).delay(300)}>
                <View className="flex-grow justify-end">
                  <Text
                    className="text-2xl text-white font-pbold max-w-[200px]"
                    numberOfLines={3}
                  >
                    {movie.title}
                  </Text>
                  <View className="flex-row items-center space-x-4 mt-2 ">
                    <TouchableOpacity
                      className="bg-secondary-100 rounded-md py-1 px-2"
                      activeOpacity={0.8}
                      onPress={showToast}
                    >
                      <Text className="text-white font-psemibold text-xs">
                        {new Date(movie.release_date).getFullYear()}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-xs font-pregular text-gray-100">
                      {movie.runtime} minutos
                    </Text>
                  </View>

                  {!isStoredMovieLoading ? (
                    <UserActions
                      history={history}
                      handleOpenHistoryModal={handleOpenAddToHistoryModal}
                      handleOpenUserRatingModal={handleOpenUserRatingModal}
                      watchedDate={watchedDate}
                    />
                  ) : (
                    <View className="w-full mt-4 flex-row items-center space-x-2">
                      <Skeleton height={40} width={40} />
                      <Skeleton height={10} width={60} />
                      <Skeleton height={40} width={40} />
                      <Skeleton height={10} width={40} />
                    </View>
                  )}
                </View>
              </Animated.View>
            </View>
            {/* Rating Bar */}
            <View className="w-full px-4 my-6 flex flex-row space-x-4">
              <View className="flex-row items-center space-x-2">
                <View className="bg-gray-800 p-2 rounded-md">
                  <TmdbLogo height={24} width={24} />
                </View>
                <Text className="text-gray-100 font-pbold text-lg">
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
              {omdbData &&
                omdbData.Ratings.map((rating) => (
                  <View
                    className="flex-row items-center space-x-2"
                    key={rating.Source}
                  >
                    <View className="bg-gray-800 p-2 rounded-md">
                      {mapper[rating.Source]}
                    </View>
                    <Text className="text-gray-100 font-pbold text-lg">
                      {rating.Value.split('/')[0]}
                    </Text>
                  </View>
                ))}
            </View>
            {/* Movie Title and Details */}
            <View className="px-4 mb-4">
              <Text className="text-gray-100 font-pbold text-lg mb-2 ">
                Sinopse
              </Text>
              <Text
                numberOfLines={5}
                className="text-gray-100 font-pregular text-xs"
              >
                {movie.overview}
              </Text>
            </View>
            <View className="px-4 mb-4">
              <Text className="text-gray-100 font-pbold text-lg mb-2 ">
                Gêneros
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {movie.genres.map((genre, index) => {
                  return (
                    <Badge
                      key={genre.id}
                      index={index}
                      onPress={() => {
                        console.log('pressed')
                      }}
                      title={genre.name}
                    />
                  )
                })}
              </ScrollView>
            </View>
            <View className="mb-4">
              <Text className="text-gray-100 font-pbold text-lg mb-4 px-4">
                Equipe Técnica
              </Text>
              <FlatList
                data={movie.casts.crew.filter(
                  (crew) =>
                    crew.job === 'Director' || crew.job === 'Screenplay',
                )}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item.name}
                    className="mr-4 flex flex-row space-x-4 items-center"
                  >
                    <Avatar size="sm" uri={tmdbImage(item.profile_path)} />
                    <View className="w-[120px]">
                      <Text className="text-gray-100 text-xs font-pbold ">
                        {item.name}
                      </Text>
                      <Text
                        className="text-gray-400 text-xs font-pregular"
                        numberOfLines={2}
                      >
                        {item.job}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{
                  paddingRight: 8,
                  flexGrow: 1,
                  paddingLeft: 16,
                }}
                horizontal={true}
                keyExtractor={(item) => item.name + item.job}
              />
            </View>

            <View className="mb-4">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleOpenCastModal}
                className="flex flex-row space-x-2 items-center mb-4 px-4"
              >
                <Text className="text-gray-100 font-pbold text-lg ">
                  Elenco
                </Text>

                <Feather name="arrow-right" color={colors.white} size={16} />
              </TouchableOpacity>
              <FlatList
                data={movie.casts.cast.slice(0, 10)}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item.name}
                    className="mr-2 flex space-y-2 items-center w-[75] justify-start text-center"
                  >
                    <Avatar size="md" uri={tmdbImage(item.profile_path)} />
                    <View>
                      <Text className="text-gray-100 text-xs font-pbold text-center">
                        {item.name}
                      </Text>
                      <Text
                        className="text-gray-400 text-xs font-pregular text-center"
                        numberOfLines={2}
                      >
                        {item.character}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{
                  paddingRight: 8,
                  paddingLeft: 16,
                  flexGrow: 1,
                }}
                horizontal={true}
                keyExtractor={(item) => item.name + item.character}
              />
            </View>
            {/* companies */}
            <View className="px-4 mb-4">
              <Text className="text-gray-100 font-pbold text-lg mb-2 ">
                Estúdios
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {movie.production_companies.map((company, index) => {
                  return (
                    <Badge
                      key={company.id}
                      index={index}
                      onPress={() => {
                        console.log('pressed')
                      }}
                      title={company.name}
                    />
                  )
                })}
              </ScrollView>
            </View>
            {/* Details */}
            <View className="px-4 mt-4 flex-row space-x-2 pb-10">
              <View className="mb-2 flex-auto">
                <View className="mb-2">
                  <Text className="text-gray-100 font-psemibold ">
                    Título Original
                  </Text>
                  <Text className="text-gray-400">{movie.original_title}</Text>
                </View>
                <View>
                  <Text className="text-gray-100 font-psemibold ">
                    Data de Lançamento
                  </Text>
                  <Text className="text-gray-400 ">{movie.release_date}</Text>
                </View>
              </View>
              <View className="mb-2 flex-auto">
                <View className="mb-2">
                  <Text className="text-gray-100 font-psemibold ">
                    Orçamento
                  </Text>
                  <Text className="text-gray-400 ">
                    {movie.budget.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-100 font-psemibold ">
                    Faturamento
                  </Text>
                  <Text className="text-gray-400 font-pregular ">
                    {movie.revenue.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {movie?.casts.cast && (
        <CastModal modalRef={castModalRef} cast={movie?.casts.cast} />
      )}
      <AddToHistoryModal
        modalRef={addToHistoryModalRef}
        onSave={handleAddToMovieToUserHistory}
        date={watchedDate}
        isLoading={addToHistoryMutation.isPending}
        isWatched={!!history?.date}
      />
      <UserRatingModal
        modalRef={userRatingModalRef}
        historyId={history?.id || addToHistoryMutation.data?.result.id}
        userRating={history?.rating}
      />
    </>
  )
}
