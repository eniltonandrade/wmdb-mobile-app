import { useEffect, useRef } from 'react'
import { Animated, type View } from 'react-native'

function Skeleton({
  className,
  ...props
}: { className?: string } & React.ComponentPropsWithoutRef<typeof View>) {
  const fadeAnim = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [fadeAnim])
  return (
    <Animated.View
      className={`bg-gray-700 rounded-md ${className} opacity-${fadeAnim}`}
      style={[{ opacity: fadeAnim }]}
      {...props}
    />
  )
}

export { Skeleton }
