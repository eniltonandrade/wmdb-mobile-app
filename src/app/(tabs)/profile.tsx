import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import TimeWidget from '@/components/TimeWidget'
import Avatar from '@/components/ui/Avatar'
import YearlyChart from '@/components/YearlyChart'
import { useSession } from '@/contexts/authContext'

export default function Profile() {
  const { user } = useSession()

  const androidPaddingCorrection =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0

  return (
    <SafeAreaView
      className="bg-primary"
      style={{ paddingTop: androidPaddingCorrection }}
    >
      <ScrollView
        className="flex space-y-4 pt-8"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center px-4 my-4">
          <View>
            <Text className="text-2xl text-white font-pbold ">Perfil</Text>
          </View>
        </View>
        <View className="flex-row w-100 items-center px-4 my-4 space-x-4">
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
                <Text className="text-gray-50 text-lg font-pbold">120</Text>
              </View>
              <View className="items-start">
                <Text className="text-gray-400 text-xs font-pregular">
                  Nota Média
                </Text>
                <Text className="text-gray-50 text-lg font-pbold">6.87</Text>
              </View>
            </View>
          </View>
        </View>

        <Text className="flex text-gray-100 font-pbold items-center justify-center px-4">
          Tempo assistindo
        </Text>
        <TimeWidget totalRunTime={105324} />

        <Text className="flex text-gray-100 font-pbold items-center justify-center mb-4 px-4">
          Filmes assistidos por ano
        </Text>

        <YearlyChart />

        <Text className="flex text-gray-100 font-pbold items-center justify-center px-4">
          Estatísticas
        </Text>

        <View className="px-4">
          {/* Stats Links */}
          <View className="space-y-3">
            <TouchableOpacity
              className="bg-gray-800 p-4 rounded-lg flex-row items-center space-x-4"
              onPress={() => {}}
            >
              <FontAwesome name="user" size={16} color={colors.green[500]} />
              <Text className="text-white font-semibold">Atores e Atrizes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-800 p-4 rounded-lg flex-row items-center space-x-4"
              onPress={() => {}}
            >
              <FontAwesome
                name="video-camera"
                size={16}
                color={colors.green[500]}
              />
              <Text className="text-white font-semibold">Diretores</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-800 p-4 rounded-lg flex-row items-center space-x-4"
              onPress={() => router.push('/stats/genres')}
            >
              <FontAwesome name="film" size={16} color={colors.green[500]} />
              <Text className="text-white font-semibold">Gêneros</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-800 p-4 rounded-lg flex-row items-center space-x-4"
              onPress={() => router.push('/stats/genres')}
            >
              <FontAwesome
                name="building"
                size={16}
                color={colors.green[500]}
              />
              <Text className="text-white font-semibold">Empresas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
