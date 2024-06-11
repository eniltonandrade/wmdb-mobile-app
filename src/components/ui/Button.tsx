import clsx from 'clsx'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

export type ButtonProps = {
  title: string
  handlePress: () => void
  isLoading?: boolean
  containerStyles?: string
  textStyles?: string
  variant?: 'outline' | 'default' | 'danger'
}

export default function Button({
  title,
  handlePress,
  isLoading,
  containerStyles,
  textStyles,
  variant = 'default',
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={clsx(
        `rounded-md h-[48px]  px-4 flex flex-row justify-center items-center ${containerStyles}`,
        {
          'opacity-50': isLoading,
          'bg-transparent': variant === 'outline',
          'border border-gray-800': variant === 'outline',
          'bg-secondary': variant === 'default',
          'bg-red-500': variant === 'danger',
        },
      )}
      disabled={isLoading}
    >
      <Text
        className={clsx(`text-primary font-psemibold text-md ${textStyles}`, {
          'text-gray-100': variant === 'outline',
        })}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  )
}
