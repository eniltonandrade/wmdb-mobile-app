import { differenceInYears, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

import { usePerson } from '@/contexts/personContext'

export default function PersonDetails() {
  const { details } = usePerson()
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        {/* Biography */}
        <View className="mb-4 py-2 px-4">
          <Text className="text-white font-pbold ">Biografia</Text>
          <Text
            numberOfLines={5}
            className="text-gray-400 text-xs font-pregular"
          >
            {details?.data?.biography || 'N/A'}
          </Text>
        </View>
        {details?.data?.birthday && (
          <View className="mb-4 px-4 ">
            <Text className="text-white font-pbold">Nascimento:</Text>
            <Text
              numberOfLines={10}
              className="text-gray-400 text-xs font-pregular"
            >
              {format(details?.data?.birthday, "dd' de 'LLLL' de 'y", {
                locale: ptBR,
              })}{' '}
              (
              {differenceInYears(new Date(), new Date(details?.data?.birthday))}{' '}
              anos){'\n'}
              {details?.data?.place_of_birth || 'N/A'}
            </Text>
          </View>
        )}
        <View className="mb-2 px-4 ">
          <Text className="text-white font-pbold">Departamento:</Text>
          <Text
            numberOfLines={10}
            className="text-gray-400 text-xs font-pregular"
          >
            {details?.data?.known_for_department || 'N/A'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
