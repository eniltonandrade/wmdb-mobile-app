import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from 'tailwindcss/colors'

export default function Loading() {
  return (
    <View className="w-full h-full items-center justify-center flex-1 bg-primary">
      <ActivityIndicator size="large" color={colors.green[500]} />
    </View>
  )
}
