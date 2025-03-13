import { Feather } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Link, router } from 'expo-router'
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import { Skeleton } from '@/components/Skeleton'
import { Container } from '@/components/ui/Container'
import { fetchGenreStats } from '@/services/api/fetch-genre-stats'

export default function GenreStats() {
  const { data, isLoading } = useQuery({
    queryKey: ['api', 'stats', 'genres'],
    queryFn: () => fetchGenreStats(),
  })

  const getRatingColor = (average: number) => {
    if (average >= 7) return 'text-green-400'
    if (average >= 6.5) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <Container>
      <SafeAreaView className="flex-grow">
        <View className="px-4 my-4 flex-1">
          {/* Header */}
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text className="text-2xl text-white font-pbold ">Gêneros</Text>
          </View>

          {isLoading ? (
            <Skeleton className="w-[200px] h-[16px] my-4" />
          ) : (
            <Text className="text-gray-400 text-sm my-4">
              Total de Gêneros Assistidos: {data?.total}
            </Text>
          )}

          {/* Genre List */}
          {isLoading ? (
            <>
              <Skeleton className="w-full h-[80px] mb-4" />
              <Skeleton className="w-full h-[80px] mb-4" />
              <Skeleton className="w-full h-[80px] mb-4" />
              <Skeleton className="w-full h-[80px] mb-4" />
            </>
          ) : (
            <FlatList
              data={data?.results}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 32,
              }}
              renderItem={({ item }) => (
                <Link
                  href={{
                    pathname: '/movies',
                    params: {
                      genre_id: item.id,
                      name: item.name,
                      count: item.count,
                      average: item.average,
                    },
                  }}
                  asChild
                  className="bg-gray-900 rounded-lg p-4 my-2 flex-row justify-between items-center"
                >
                  <TouchableOpacity activeOpacity={0.8}>
                    <View>
                      <Text className="text-white text-lg font-psemibold">
                        {item.name}
                      </Text>
                      <Text className="text-gray-400 text-xs font-pregular">
                        Filmes Assistidos: {item.count}
                      </Text>
                    </View>
                    <Text
                      className={`text-xl font-bold ${getRatingColor(item.average)}`}
                    >
                      {item.average.toFixed(1)}
                    </Text>
                  </TouchableOpacity>
                </Link>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </Container>
  )
}
