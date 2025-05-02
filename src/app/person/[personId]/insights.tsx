import { Link } from 'expo-router'
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { roleMap, roleMapType } from '@/constants/utils'
import { usePerson } from '@/contexts/personContext'
import { tmdbImage } from '@/utils/image'

export default function Insights() {
  const { insights } = usePerson()
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {insights && (
          <View>
            {insights.data?.highestRated && (
              <View className="my-4 flex-col border pb-2 border-b-gray-900">
                <Text className="text-white text-lg font-pbold mb-2">
                  Melhor Filme
                </Text>

                <View className="flex-row items-center">
                  <Link
                    asChild
                    href={{
                      pathname: '/movie/[movieId]',
                      params: {
                        movieId: insights.data?.highestRated.tmdbId,
                      },
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.7}>
                      <Image
                        source={{
                          uri: tmdbImage(
                            insights.data.highestRated.posterPath,
                            'w154',
                          ),
                        }}
                        alt=""
                        className="w-16 h-24 rounded-md mr-4"
                      />
                    </TouchableOpacity>
                  </Link>
                  <View className="h-full">
                    <Text className="font-pbold  mb-2 text-white">
                      {insights.data?.highestRated.title}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Média: {insights.data?.highestRated.averageRating}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Duração: {insights.data?.highestRated.runtime} min
                    </Text>
                    <Text className="font-pregular text-xs  text-gray-300">
                      {roleMap[insights.data?.highestRated.role as roleMapType]}{' '}
                      / {insights.data?.highestRated.character}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {insights.data?.lowestRated && (
              <View className="mb-4 border pb-2 border-b-gray-900">
                <Text className="text-white text-lg font-pbold mb-2">
                  Pior Filme
                </Text>

                <View className="flex-row items-center">
                  <Link
                    asChild
                    href={{
                      pathname: '/movie/[movieId]',
                      params: {
                        movieId: insights.data?.lowestRated.tmdbId,
                      },
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.7}>
                      <Image
                        source={{
                          uri: tmdbImage(
                            insights?.data.lowestRated.posterPath,
                            'w154',
                          ),
                        }}
                        alt=""
                        className="w-16 h-24 rounded-md mr-4"
                      />
                    </TouchableOpacity>
                  </Link>
                  <View className="h-full">
                    <Text className="font-pbold mb-2 text-white">
                      {insights.data?.lowestRated.title}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Média: {insights.data?.lowestRated.averageRating}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Duração: {insights.data?.lowestRated.runtime} min
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      {roleMap[insights.data?.lowestRated.role as roleMapType]}{' '}
                      / {insights.data?.lowestRated.character}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {insights.data?.favoriteCompany && (
              <View className="mb-4 border pb-2 border-b-gray-900">
                <Text className="text-white text-lg font-pbold mb-2">
                  Estúdio favorito
                </Text>
                <View className="flex-row items-center mt-1">
                  <Link
                    asChild
                    href={{
                      pathname: '/movies',
                      params: {
                        company_id: insights.data?.favoriteCompany.id,
                        name: insights.data?.favoriteCompany.name,
                      },
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.7}>
                      <Image
                        alt=""
                        resizeMode="contain"
                        className=" w-16 h-16 bg-white rounded-md p-1 mr-4"
                        source={{
                          uri: tmdbImage(
                            insights.data?.favoriteCompany.logoPath,
                            'w500',
                          ),
                        }}
                      />
                    </TouchableOpacity>
                  </Link>
                  <View className="h-full">
                    <Text className="text-base text-white font-pregular">
                      {insights.data?.favoriteCompany.name}
                    </Text>
                    <Text className="font-pregular text-xs text-gray-300">
                      Total: {insights.data?.favoriteCompany.count}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {insights.data?.frequentCollaborators &&
              insights.data?.frequentCollaborators.length > 0 && (
                <View className="mb-6">
                  <Text className="text-white text-lg font-pbold mb-2">
                    Colaboradores frequentes
                  </Text>
                  {insights.data?.frequentCollaborators.map((c, index) => (
                    <Link
                      asChild
                      key={`${c.id}-${index}`}
                      href={{
                        pathname: '/person/[personId]',
                        params: {
                          personId: c.tmdbId,
                        },
                      }}
                    >
                      <TouchableOpacity activeOpacity={0.7}>
                        <View className="flex-row items-center mb-3">
                          <Image
                            alt=""
                            source={{ uri: tmdbImage(c.profilePath, 'w154') }}
                            className="w-16 h-16 rounded-full mr-3"
                          />
                          <View>
                            <Text className="text-white font-pbold">
                              {c.name}
                            </Text>
                            <Text className="text-gray-200 text-xs">
                              {roleMap[c.role as roleMapType]} – {c.count}{' '}
                              filmes
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Link>
                  ))}
                </View>
              )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
