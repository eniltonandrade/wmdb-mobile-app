import { tmdbImage } from '@/utils/image'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'

import colors from 'tailwindcss/colors'

import { router } from 'expo-router'

type MovieCarrousel = {
  tmdbId: number
  id?: string | null
  title: string
  releaseDate: Date | null
  rating: number | null
  posterPath: string | null
  userRating: number | null
  isWatched: boolean
}

export type MovieCarrouselProps = {
  movies: MovieCarrousel[]
  emptyListText: string
}

export function MoviesCarrousel({
  movies = [],
  emptyListText,
}: MovieCarrouselProps) {
  function handleNavigate(id: number) {
    router.setParams({ id: String(id) })
    router.push(`/movie/${id}`)
  }

  return (
    <View className="space-y-4 mb-4">
      <FlatList
        keyExtractor={(item) => item.id || String(item.tmdbId)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: movies.length > 0 ? 32 : 16,
          flexGrow: 1,
        }}
        horizontal
        data={movies}
        ListEmptyComponent={() => (
          <View className="flex flex-1 border w-full border-gray-600 rounded-md items-center justify-center px-4 py-8">
            <FontAwesome name="film" size={32} color={colors.gray[600]} />
            <Text className="text-sm font-pthin text-gray-300 mt-4 text-center">
              {emptyListText}
            </Text>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <View className="w-[130px] mr-4 space-y-2">
              <TouchableOpacity
                className="relative"
                onPress={() => handleNavigate(item.tmdbId)}
              >
                {item.posterPath && (
                  <Image
                    source={{ uri: tmdbImage(item.posterPath, 'w154') }}
                    className="rounded-md bg-gray-800"
                    resizeMode={'cover'}
                    height={210}
                    alt={item.title}
                  />
                )}
                <View className="absolute bg-black/70 right-1 top-1 px-1 py-0.5 rounded-md">
                  <Text className="text-gray-50 text-xs font-pbold">
                    {item.rating?.toFixed(1) || '0.0'}
                  </Text>
                </View>
                {item.userRating && (
                  <View className="absolute bg-secondary-100 items-center justify-center right-3 bottom-[-6] h-7 w-7 rounded-full border-primary border-4 z-10">
                    <Text className="text-gray-50 text-xs font-pmedium  text-shad">
                      {item.userRating}
                    </Text>
                  </View>
                )}
                {item.isWatched && (
                  <View className="absolute bg-secondary-200 items-center justify-center right-[-4] bottom-[-6] h-7 w-7 rounded-full border-primary border-4">
                    <Text className="text-gray-50 text-xs font-pmedium  text-shad">
                      <FontAwesome name="eye" />
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <View>
                <Text
                  numberOfLines={2}
                  className="text-gray-100 font-psemibold text-xs"
                >
                  {item.title}
                </Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}
