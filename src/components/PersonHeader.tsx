import { Image, Text, View } from 'react-native'

import { usePerson } from '@/contexts/personContext'
import { tmdbImage } from '@/utils/image'

export default function PersonHeader() {
  const { details, insights } = usePerson()

  return (
    <View className="flex-row  items-center mb-4 px-4">
      {details?.data?.profile_path && (
        <Image
          source={{
            uri: tmdbImage(details?.data?.profile_path, 'w500'),
          }}
          className="w-20 h-20 rounded-full mr-4"
          alt=""
        />
      )}

      <View>
        <Text className="text-2xl text-white font-pbold">
          {details?.data?.name}
        </Text>
        {/* Movie Stats */}
        <View className="flex-row  mt-2 space-x-6">
          <View className="items-start">
            <Text className="text-gray-400 text-xs font-pregular">Filmes</Text>
            <Text className="text-white text-lg font-pbold">
              {insights?.data?.movieCount || 0}
            </Text>
          </View>
          <View className="items-start">
            <Text className="text-gray-400 text-xs font-pregular">Média</Text>
            <Text className="text-white text-lg font-pbold">
              {insights?.data?.averageRating || 0}
            </Text>
          </View>
          <View className="items-start">
            <Text className="text-gray-400 text-xs font-pregular">
              Tempo Total:
            </Text>
            <Text className="text-white text-lg font-pbold">
              {insights?.data?.totalRuntime || 0} hrs
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
