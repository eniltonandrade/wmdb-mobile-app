import { View, Image } from 'react-native'
import React from 'react'
import { type ComponentProps } from 'react'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

export type AvatarProps = {
  uri: string
  size: 'sm' | 'md' | 'lg'
} & ComponentProps<typeof View>

const SIZES = {
  sm: 50,
  md: 70,
  lg: 90,
}

export default function Avatar({ uri, size, ...props }: AvatarProps) {
  return (
    <View {...props}>
      {uri ? (
        <Image
          source={{ uri }}
          height={SIZES[size]}
          width={SIZES[size]}
          className="rounded-full"
          alt="avatar"
        />
      ) : (
        <View
          className={`w-[${SIZES[size]}px] h-[${SIZES[size]}px] rounded-full bg-gray-900 items-center justify-center`}
        >
          <Feather name="user" color={colors.gray[500]} size={32} />
        </View>
      )}
    </View>
  )
}
