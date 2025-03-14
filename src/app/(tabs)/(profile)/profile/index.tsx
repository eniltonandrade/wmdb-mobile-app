import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import TimeWidget from '@/components/TimeWidget'
import Avatar from '@/components/ui/Avatar'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import YearlyChart from '@/components/YearlyChart'
import { useSession } from '@/contexts/authContext'
import { getUserHistoryStats } from '@/services/api/get-user-history-stats'

export default function Profile() {
  const { user } = useSession()

  const { data } = useQuery({
    queryKey: ['api', 'report', 'user', 'history'],
    queryFn: () =>
      getUserHistoryStats({
        preferred_rating: 'imdb_rating',
      }),
  })

  return (
    <Container>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row justify-between items-center px-4 my-4">
            <View>
              <Text className="text-2xl text-white font-pbold ">Perfil</Text>
            </View>
          </View>
          <View className="flex-row w-100 items-center px-4 mb-4 space-x-4">
            <Avatar size="lg" uri="https://github.com/eniltonandrade.png" />
            <View className="flex-1">
              <Text className="text-gray-50 text-xl font-pbold">
                {user?.name}
              </Text>
              {/* Movie Stats */}
              <View className="flex-row  mt-2 space-x-6">
                <View className="items-start">
                  <Text className="text-gray-400 text-xs font-pregular">
                    Total de Filmes
                  </Text>
                  <Text className="text-gray-50 text-lg font-pbold">
                    {data?.movieCount}
                  </Text>
                </View>
                <View className="items-start">
                  <Text className="text-gray-400 text-xs font-pregular">
                    Nota Média
                  </Text>
                  <Text className="text-gray-50 text-lg font-pbold">
                    {data?.averageRating}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="px-2 space-y-4">
            <Heading size="lg">Tempo assistindo</Heading>
            {data && data.totalRuntime > 0 && (
              <TimeWidget totalRunTime={data.totalRuntime} />
            )}
          </View>

          <View className="px-2 space-y-4">
            <Heading size="lg">Filmes assistidos por ano</Heading>
            <YearlyChart />
          </View>

          <View className="px-2 mt-4 mb-8">
            {/* Stats Links */}
            <View className="space-y-3">
              <Heading size="lg">Estatísticas</Heading>
              <Link
                href="/(tabs)/(profile)/stats/cast"
                className="bg-gray-900 p-4 rounded-lg"
                asChild
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  className=" flex-row items-center space-x-4"
                >
                  <Text className="text-white font-semibold">
                    Atores e Atrizes
                  </Text>
                </TouchableOpacity>
              </Link>

              <Link
                href="/(tabs)/(profile)/stats/crew"
                className="bg-gray-900 p-4 rounded-lg"
                asChild
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  className=" flex-row items-center space-x-4"
                >
                  <Text className="text-white font-semibold">Diretores</Text>
                </TouchableOpacity>
              </Link>

              <Link
                href="/(tabs)/(profile)/stats/genres"
                className="bg-gray-900 p-4 rounded-lg"
                asChild
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  className=" flex-row items-center space-x-4"
                >
                  <Text className="text-white font-semibold">Gêneros</Text>
                </TouchableOpacity>
              </Link>

              <Link
                href="/(tabs)/(profile)/stats/companies"
                className="bg-gray-900 p-4 rounded-lg"
                asChild
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  className=" flex-row items-center space-x-4"
                >
                  <Text className="text-white font-semibold">Estúdios</Text>
                </TouchableOpacity>
              </Link>
              <Link
                href="/(tabs)/(profile)/stats/released-year"
                className="bg-gray-900 p-4 rounded-lg"
                asChild
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  className=" flex-row items-center space-x-4"
                >
                  <Text className="text-white font-semibold">
                    Anos de Lançamento
                  </Text>
                </TouchableOpacity>
              </Link>
              <Link
                href="/(tabs)/(profile)/stats/watched-year"
                className="bg-gray-900 p-4 rounded-lg"
                asChild
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  className=" flex-row items-center space-x-4"
                >
                  <Text className="text-white font-semibold">Assistido em</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  )
}
