import { Feather, FontAwesome } from '@expo/vector-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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

import ImdbLogo from '@/assets/icons/imdb_logo.svg'
import Metacritic from '@/assets/icons/metacritic_logo.svg'
import TmdbLogo from '@/assets/icons/tmdb_logo.svg'
import Tomatoes from '@/assets/icons/tomatometer-aud_score-fresh.svg'
import { HistoryDetails } from '@/services/api/models/history-details'
import { tmdbImage } from '@/utils/image'

type MovieListProps = {
  items: HistoryDetails[]
  fetchNextPage: () => void
  openMovieActions: (id: string) => void
  handleNavigate: (id: number) => void
}

const MovieList = ({
  items,
  fetchNextPage,
  handleNavigate,
  openMovieActions,
}: MovieListProps) => {
  return (
    <FlatList
      data={items}
      onEndReached={() => fetchNextPage()}
      showsVerticalScrollIndicator={false}
      ListFooterComponentStyle={{ marginBottom: 16, paddingTop: 16 }}
      ListFooterComponent={
        <ActivityIndicator size="small" color={colors.green[500]} />
      }
      keyExtractor={(item) => String(item.id)}
      onEndReachedThreshold={0.1}
      renderItem={({ item }) => (
        <View className="rounded-lg w-full flex-row p-2 mb-4 space-x-4 relative ">
          {item.movie.posterPath && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleNavigate(item.movie.tmdbId)}
            >
              <Image
                source={{ uri: tmdbImage(item.movie.posterPath, 'w154') }}
                className="rounded-md bg-gray-800"
                resizeMode={'cover'}
                width={96}
                height={140}
                alt={item.movie.title}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleNavigate(item.movie.tmdbId)}
            className="flex-1 border-b-[1px] border-gray-800 pb-4"
          >
            <Text className="text-gray-400 text-md font-pregular">
              {new Date(item.movie.releaseDate).getFullYear()}
            </Text>
            <Text
              className="text-gray-100 font-pbold text-base leading-5 mb-2"
              numberOfLines={2}
            >
              {item.movie.title}
            </Text>
            <Text className="text-gray-400 text-xs font-plight">
              Assistido em:{' '}
              {format(new Date(item.date), "d 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </Text>

            <View className="mt-2 flex-row space-x-3 absolute bottom-4">
              {item.rating && (
                <View className="flex-row items-center space-x-2">
                  <FontAwesome
                    name="user"
                    size={18}
                    color={colors.green[500]}
                  />
                  <Text className="text-gray-100 text-md font-pextrabold">
                    {item.rating}
                  </Text>
                </View>
              )}
              <View className="flex-row items-center space-x-2">
                <TmdbLogo height={22} width={22} />
                <Text className="text-gray-100 text-md font-pextrabold">
                  {item.movie.tmdbRating}
                </Text>
              </View>
              {item.movie.imdbRating && (
                <View className="flex-row items-center space-x-2">
                  <ImdbLogo height={22} width={22} />
                  <Text className="text-gray-100 text-md font-pextrabold">
                    {item.movie.imdbRating}
                  </Text>
                </View>
              )}
              {item.movie.rottenTomatoesRating && (
                <View className="flex-row items-center space-x-2">
                  <Tomatoes height={22} width={22} />
                  <Text className="text-gray-100 text-md font-pextrabold">
                    {item.movie.rottenTomatoesRating}
                  </Text>
                </View>
              )}
              {item.movie.metacriticRating && (
                <View className="flex-row items-center space-x-2">
                  <Metacritic height={22} width={22} />
                  <Text className="text-gray-100 text-lg font-pextrabold">
                    {item.movie.metacriticRating}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <Pressable className="absolute right-2">
            <Feather
              name="more-vertical"
              color={colors.gray[100]}
              size={22}
              onPress={() => openMovieActions(item.movie.id)}
            />
          </Pressable>
        </View>
      )}
    />
  )
}

export default MovieList
