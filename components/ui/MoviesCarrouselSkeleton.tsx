import { View } from 'react-native'
import React from 'react'
import { Skeleton } from '../Skeleton'
import colors from 'tailwindcss/colors'

export default function MoviesCarrouselSkeleton() {
  return (
    <View className="flex flex-row space-x-4 px-4">
      <View>
        <Skeleton
          style={{
            height: 210,
            width: 130,
            backgroundColor: colors.gray[800],
            borderRadius: 5,
          }}
        />
        <Skeleton
          style={{
            height: 8,
            width: 130,
            marginTop: 4,
          }}
        />
      </View>
      <View>
        <Skeleton
          style={{
            height: 210,
            width: 130,
            backgroundColor: colors.gray[800],
            borderRadius: 5,
          }}
        />
        <Skeleton
          style={{
            height: 8,
            width: 130,
            marginTop: 4,
          }}
        />
      </View>
    </View>
  )
}
