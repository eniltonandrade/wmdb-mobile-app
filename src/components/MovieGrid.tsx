import { Feather, FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import { History } from '@/services/api/types'
import { tmdbImage } from '@/utils/image'

type MovieGridsProps = {
  items: History[]
  fetchNextPage: () => void
  openMovieActions: (id: string) => void
  listHeader?: JSX.Element
  isFullyLoaded: boolean
}

const MovieGrid = ({
  items,
  openMovieActions,
  fetchNextPage,
  listHeader,
  isFullyLoaded,
}: MovieGridsProps) => {
  return (
    <FlatList
      data={items}
      onEndReached={() => fetchNextPage()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeader}
      ListFooterComponentStyle={{ marginBottom: 16, paddingTop: 16 }}
      numColumns={3}
      ListFooterComponent={
        items.length > 0 && !isFullyLoaded ? (
          <ActivityIndicator size="small" color={colors.green[500]} />
        ) : (
          <></>
        )
      }
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center">
          <FontAwesome name="search" color={colors.gray[400]} size={36} />
          <Text className="text-gray-50 font-pbold my-4">
            Nenhum filme encontrado.
          </Text>
        </View>
      }
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyExtractor={(item) => String(item.id)}
      onEndReachedThreshold={0.1}
      renderItem={({ item }) => (
        <View className="w-[33%] mb-4 px-2">
          <Link
            href={`/movie/${item.movie?.tmdbId}`}
            asChild
            className="relative"
          >
            <TouchableOpacity activeOpacity={0.7}>
              {item.movie?.posterPath && (
                <Image
                  source={{ uri: tmdbImage(item.movie.posterPath, 'w500') }}
                  className="rounded-md bg-gray-900"
                  resizeMode={'cover'}
                  height={160}
                  alt={item.movie.title}
                />
              )}
              <View className="absolute bg-black/70 right-1 top-1 px-1 py-0.5 rounded-md">
                <Text className="text-white text-xs font-pbold">
                  {item.movie?.averageRating?.toFixed(1) || '0.0'}
                </Text>
              </View>
              {item.rating?.toString() && (
                <View className="absolute bg-secondary-100 items-center justify-center right-3 bottom-[-6] h-7 w-7 rounded-full border-primary border-4 z-10">
                  <Text className="text-white text-xs font-pmedium  text-shad">
                    {item.rating}
                  </Text>
                </View>
              )}
              {item.date && (
                <View className="absolute bg-secondary-200 items-center justify-center right-[-4] bottom-[-6] h-7 w-7 rounded-full border-primary border-4">
                  <Text className="text-white text-xs font-pmedium  text-shad">
                    <FontAwesome name="eye" />
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Link>
          <View className="mt-2 flex-row items-start">
            <View className="flex flex-col">
              <Text
                numberOfLines={2}
                className="text-gray-50 font-psemibold text-xs flex-1"
              >
                {item.movie?.title}
              </Text>
              <Text
                numberOfLines={1}
                className="text-gray-400 font-pregular text-xs flex-1"
              >
                {item.movie?.credits?.at(0)?.character}
                {item.movie?.credits?.at(0)?.role === 'DIRECTOR' && 'Diretor'}
              </Text>
            </View>
            <Pressable onPress={() => openMovieActions(item.movie!.id)}>
              <Feather
                name="more-vertical"
                color={colors.gray[100]}
                size={18}
              />
            </Pressable>
          </View>
        </View>
      )}
    />
  )
}

export default MovieGrid
