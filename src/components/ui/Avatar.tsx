import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Image, ImageProps, View } from 'react-native'
import colors from 'tailwindcss/colors'

export type AvatarProps = {
  uri: string | null
  size: 'sm' | 'md' | 'lg'
} & ImageProps

const SIZES = {
  sm: 50,
  md: 70,
  lg: 90,
}

export default function Avatar({ uri, size, ...props }: AvatarProps) {
  return (
    <View>
      {uri ? (
        <Image
          {...props}
          source={{ uri }}
          height={SIZES[size]}
          width={SIZES[size]}
          className="rounded-full bg-gray-900"
          alt="avatar"
        />
      ) : (
        <View
          {...props}
          className={`rounded-full bg-gray-900 items-center justify-center`}
          style={{ height: SIZES[size], width: SIZES[size] }}
        >
          <Feather name="user" color={colors.gray[500]} size={32} />
        </View>
      )}
    </View>
  )
}
