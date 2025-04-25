import { FontAwesome } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import {
  fetchPeopleRanking,
  FetchPeopleRankingRequest,
} from '@/services/api/fetch-people-ranking'
import { tmdbImage } from '@/utils/image'

import { Skeleton } from './Skeleton'
import Avatar from './ui/Avatar'

const TopCastCarrousel = () => {
  const params: FetchPeopleRankingRequest = {
    page: 1,
  }
  const { data } = useQuery({
    queryKey: ['api', 'ranking', 'person', ...Object.values(params)],
    queryFn: () => fetchPeopleRanking(params),
  })

  return (
    <View className="mb-4">
      <Link asChild href="/stats/cast">
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row w-full px-4 pb-4 text-xs items-center"
        >
          <Text className="flex text-gray-50 text-lg font-pbold ">
            Favoritos
          </Text>
          <Text className="flex text-gray-400 text-xs font-pregular ml-2">
            Atores e Atrizes
          </Text>
        </TouchableOpacity>
      </Link>
      {data ? (
        <FlatList
          data={data.slice(0, 10)}
          ListEmptyComponent={() => (
            <View className="flex flex-1 border w-full border-gray-600 rounded-md items-center justify-center py-4">
              <FontAwesome name="star-o" size={32} color={colors.gray[600]} />
              <Text className="text-sm font-pthin text-gray-300 mt-4 text-center">
                Seus artistas favoritos irão aparecer aqui
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingLeft: 16,
            paddingRight: data.length > 0 ? 32 : 16,
          }}
          horizontal
          renderItem={({ item, index }) => (
            <View className="w-[90px] mr-4">
              <Link
                asChild
                href={{
                  pathname: '/person/[personId]',
                  params: {
                    personId: item.tmdbId,
                  },
                }}
              >
                <TouchableOpacity activeOpacity={0.7}>
                  <Avatar
                    size="lg"
                    uri={tmdbImage(item.profilePath || '')}
                    className="relative mb-2 bg-gray-900"
                  />

                  <View className="bg-gray-900 w-[35px] h-[35px] absolute bottom-0 left-0 rounded-full items-center justify-center ">
                    <Text className="text-white text-xl leading-none font-pbold text-center">
                      {index + 1}º
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
              <Text
                numberOfLines={1}
                className="text-gray-50 text-xs font-psemibold text-center mb-1"
              >
                {item.name}
              </Text>
              <Text className="text-gray-300 text-xs font-plight text-center">
                Nota: {item.score}
              </Text>
            </View>
          )}
        />
      ) : (
        <View className="mx-4 flex-row space-x-4">
          <View>
            <Skeleton
              width={90}
              height={90}
              style={{
                borderRadius: 9999,
              }}
            />
            <Skeleton width={90} height={8} style={{ marginTop: 6 }} />
          </View>
          <View>
            <Skeleton
              width={90}
              height={90}
              style={{
                borderRadius: 9999,
              }}
            />
            <Skeleton width={90} height={8} style={{ marginTop: 6 }} />
          </View>
          <View>
            <Skeleton
              width={90}
              height={90}
              style={{
                borderRadius: 9999,
              }}
            />
            <Skeleton width={90} height={8} style={{ marginTop: 6 }} />
          </View>
        </View>
      )}
    </View>
  )
}

export default TopCastCarrousel
