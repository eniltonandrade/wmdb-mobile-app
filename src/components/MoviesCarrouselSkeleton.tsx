import React from 'react'
import { View } from 'react-native'

import { Skeleton } from '@/components/Skeleton'

export default function MoviesCarrouselSkeleton() {
  return (
    <View className="flex flex-row space-x-4 px-4 mb-4">
      <View>
        <Skeleton width={130} height={210} className="mb-2" />
        <Skeleton width={130} height={8} />
      </View>
      <View>
        <Skeleton width={130} height={210} className="mb-2" />
        <Skeleton width={130} height={8} />
      </View>
    </View>
  )
}
