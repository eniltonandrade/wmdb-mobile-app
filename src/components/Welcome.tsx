import React from 'react'
import { Image, Text, View } from 'react-native'

import { useSession } from '@/contexts/authContext'

export default function Welcome() {
  const { user } = useSession()

  function getFirstAndLastName(fullName: string) {
    if (!fullName || typeof fullName !== 'string') {
      return ''
    }

    const nameParts = fullName.trim().split(/\s+/)

    if (nameParts.length === 1) {
      return nameParts[0] // Only one word, return it as is
    }

    const firstName = nameParts[0]
    const lastName = nameParts[nameParts.length - 1]

    return `${firstName} ${lastName}`
  }

  return (
    <View className="flex justify-between items-start flex-row mb-6 px-4 ">
      <View>
        <Text className="font-pmedium text-sm text-gray-100">Bem Vindo,</Text>
        <Text className="text-2xl font-psemibold text-white">
          {user && getFirstAndLastName(user.name)}
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
