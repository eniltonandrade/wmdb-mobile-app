import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

type AnimatedHeaderProps = {
  title: string
  goBack: () => void
  rightButton?: React.ReactNode
  scrollY: SharedValue<number>
}

export default function AnimatedHeader({
  title,
  goBack,
  rightButton,
  scrollY,
}: AnimatedHeaderProps) {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
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
        containerAnimatedStyle,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.gray['900'],
          borderBottomColor: colors.gray['800'],
          borderBottomWidth: 1,
          paddingHorizontal: 16,
          paddingBottom: 8,
          paddingTop: 50,
          zIndex: 1000,
        },
      ]}
    >
      <View className="items-center flex-row space-x-4 pb-1  justify-between overflow-hidden">
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text className="text-gray-100 font-pbold">{title}</Text>
        {rightButton || <View></View>}
      </View>
    </Animated.View>
  )
}
