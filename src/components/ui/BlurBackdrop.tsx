import { StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import React from 'react'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

type BlurBackdrop = {
  animatedIndex: SharedValue<number>
}

export function BlurBackdrop({ animatedIndex }: BlurBackdrop) {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP,
    )
    return {
      opacity,
    }
  })

  return (
    <Animated.View
      style={[
        { backgroundColor: 'rgba(0,0,0,0.5)' },
        StyleSheet.absoluteFill,
        containerAnimatedStyle,
      ]}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        tint="dark"
        intensity={25}
        experimentalBlurMethod="dimezisBlurView"
      />
    </Animated.View>
  )
}
