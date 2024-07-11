import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import TmdbLogo from '@/assets/icons/tmdb_logo.svg'
import SearchInput from '@/components/SearchInput'
import { searchMoviesInTmdb } from '@/services/tmdb/search'
import { tmdbImage } from '@/utils/image'

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function Search() {
  const { query } = useLocalSearchParams<{ query: string }>()
  const [searchQuery, setSearchQuery] = useState(query)

  const { data: movies } = useQuery({
    queryKey: ['tmdb', 'search', searchQuery],
    queryFn: () => searchMoviesInTmdb(searchQuery!, 'pt-BR'),
    enabled: !!searchQuery,
  })

  function handleSearch(query: string) {
    if (query.length > 2) {
      setSearchQuery(query)
    }

    if (query === '') {
      setSearchQuery(undefined)
    }
  }
  const debouncedChangeHandler = useMemo(
    () => _.debounce(handleSearch, 300),
    [],
  )

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  })

  function handleNavigate(id: number) {
    router.setParams({ id: String(id) })
    router.push(`/movie/${id}`)
  }

  /*
    TODO: History of searches
    TODO: Indicar filmes assistidos
    TODO: Mostrar mensagem quando não há resultado
    TODO: Botão para limpar Input
  */

  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{ paddingTop: androidPaddingCorrection }}
    >
      <View className="px-4 mb-4">
        <Text className="text-2xl text-white font-pbold ">Busca</Text>
      </View>
      <SearchInput handleSearch={debouncedChangeHandler} />
      <View className="px-2 mb-4">
        <FlatList
          data={movies}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={{ marginBottom: 16, paddingTop: 16 }}
          keyExtractor={(item) => String(item.id)}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <View className="rounded-lg w-full flex-row p-2 mb-4 space-x-4 relative ">
              {item.poster_path && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleNavigate(item.id)}
                >
                  <Image
                    source={{ uri: tmdbImage(item.poster_path, 'w154') }}
                    className="rounded-md bg-gray-800"
                    resizeMode={'cover'}
                    width={80}
                    height={110}
                    alt={item.title}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleNavigate(item.id)}
                className="flex-1 border-b-[1px] border-gray-800 pb-4"
              >
                <Text className="text-gray-400 text-md font-pregular">
                  {new Date(item.release_date).getFullYear()}
                </Text>
                <Text
                  className="text-gray-100 font-pbold text-base leading-5 mb-2"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <View className="mt-2 flex-row space-x-3 absolute bottom-4">
                  <View className="flex-row items-center space-x-2">
                    <TmdbLogo height={22} width={22} />
                    <Text className="text-gray-100 text-md font-pextrabold">
                      {item.vote_average.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
