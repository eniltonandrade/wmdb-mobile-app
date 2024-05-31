import { Text, Pressable } from 'react-native'
import React, { ComponentProps } from 'react'
import Animated, { FadeInRight } from 'react-native-reanimated'

type BadgeProps = {
  title: string
  index: number
  onPress: () => void
} & ComponentProps<typeof Pressable>

export default function Badge({
  index = 0,
  onPress,
  title,
  ...props
}: BadgeProps) {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        onPress={onPress}
        className="bg-secondary-100 py-1 px-2 rounded-md mr-2 "
        {...props}
      >
        <Text className="text-white font-psemibold text-xs">{title}</Text>
      </Pressable>
    </Animated.View>
  )
}
