import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

type SkeletonProps = {
  width: number
  height: number
}

export function Skeleton({
  style,
  width,
  height,
}: SkeletonProps & React.ComponentPropsWithoutRef<typeof View>) {
  const opacity = useSharedValue<number>(0.5)

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {
          duration: 1000,
        }),
        withTiming(1, {
          duration: 1000,
        }),
      ),
      Infinity,
      true,
    )
  }, [opacity])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View
      style={[
        {
          height,
          width,
        },
        { backgroundColor: colors.gray[800], borderRadius: 3 },
        animatedStyles,
        style,
      ]}
    />
  )
}
