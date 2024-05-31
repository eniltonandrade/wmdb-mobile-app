import { View, Image } from 'react-native'
import React from 'react'
import { type ComponentProps } from 'react'

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
      <Image
        source={{ uri }}
        height={SIZES[size]}
        width={SIZES[size]}
        className="rounded-full border"
        alt="avatar"
      />
    </View>
  )
}
