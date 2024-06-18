import { Feather, FontAwesome } from '@expo/vector-icons'
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

import { HistoryDetails } from '@/services/api/models/history-details'
import { tmdbImage } from '@/utils/image'

type MovieGridsProps = {
  items: HistoryDetails[]
  fetchNextPage: () => void
  openMovieActions: (id: string) => void
  handleNavigate: (id: number) => void
}

const MovieGrid = ({
  items,
  openMovieActions,
  fetchNextPage,
  handleNavigate,
}: MovieGridsProps) => {
  return (
    <FlatList
      data={items}
      onEndReached={() => fetchNextPage()}
      showsVerticalScrollIndicator={false}
      ListFooterComponentStyle={{ marginBottom: 16, paddingTop: 16 }}
      numColumns={3}
      ListFooterComponent={
        items.length > 0 ? (
          <ActivityIndicator size="small" color={colors.green[500]} />
        ) : (
          <></>
        )
      }
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center">
          <FontAwesome name="search" color={colors.gray[400]} size={36} />
          <Text className="text-gray-100 font-pbold my-4">
            Nenhum filme encontrado para esse filtro.
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
          <TouchableOpacity
            className="relative"
            onPress={() => handleNavigate(item.movie.tmdbId)}
          >
            {item.movie.posterPath && (
              <Image
                source={{ uri: tmdbImage(item.movie.posterPath, 'w500') }}
                className="rounded-md bg-gray-800"
                resizeMode={'cover'}
                height={160}
                alt={item.movie.title}
              />
            )}
            <View className="absolute bg-black/70 right-1 top-1 px-1 py-0.5 rounded-md">
              <Text className="text-gray-50 text-xs font-pbold">
                {item.movie.tmdbRating?.toFixed(1) || '0.0'}
              </Text>
            </View>
            {item.rating?.toString() && (
              <View className="absolute bg-secondary-100 items-center justify-center right-3 bottom-[-6] h-7 w-7 rounded-full border-primary border-4 z-10">
                <Text className="text-gray-50 text-xs font-pmedium  text-shad">
                  {item.rating}
                </Text>
              </View>
            )}
            {item.date && (
              <View className="absolute bg-secondary-200 items-center justify-center right-[-4] bottom-[-6] h-7 w-7 rounded-full border-primary border-4">
                <Text className="text-gray-50 text-xs font-pmedium  text-shad">
                  <FontAwesome name="eye" />
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <View className="mt-2 flex-row items-start">
            <Text
              numberOfLines={2}
              className="text-gray-100 font-psemibold text-xs flex-1"
            >
              {item.movie.title}
            </Text>
            <Pressable onPress={() => openMovieActions(item.movie.id)}>
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
