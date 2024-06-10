import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function Loading() {
  return (
    <View className="w-full h-full items-center justify-center flex-1 bg-primary">
      <ActivityIndicator size="large" color={colors.green[500]} />
    </View>
  )
}
