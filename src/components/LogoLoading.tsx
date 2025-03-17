import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

export default function LogoLoading() {
  const logoScale = useSharedValue(1)

  const logoAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }))

  function logoAnimation() {
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500, easing: Easing.ease }),
        withTiming(1, { duration: 500, easing: Easing.ease }),
      ),
      -1,
      true,
    )
  }

  useEffect(() => {
    logoAnimation()
  }, [])

  return (
    <View className="w-full h-full items-center justify-center flex-1 bg-primary">
      <Animated.Image
        source={require('@/assets/images/logo.png')}
        style={[styles.logo, logoAnimatedStyles]}
        height={70}
        width={70}
      />
      <Text className="text-gray-50 font-pmedium mt-4">
        Conectando no servidor.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 64,
    height: 64,
  },
})
