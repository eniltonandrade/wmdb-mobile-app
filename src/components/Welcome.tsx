import React from 'react'
import { Image, Text, View } from 'react-native'

export default function Welcome() {
  return (
    <View className="flex justify-between items-start flex-row mb-6 px-4 ">
      <View>
        <Text className="font-pmedium text-sm text-gray-100">Bem Vindo,</Text>
        <Text className="text-2xl font-psemibold text-white">
          Enilton Andrade
        </Text>
      </View>

      <View className="mt-1.5">
        <Image
          className="rounded-full"
          source={{ uri: 'https://github.com/eniltonandrade.png' }}
          height={50}
          width={50}
          alt="user avatar"
        />
      </View>
    </View>
  )
}
