import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { Text } from 'react-native'

export type HeadingProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function Heading({ children, size = 'md' }: HeadingProps) {
  return (
    <Text
      className={clsx(
        'flex text-gray-50 font-pbold items-center justify-center',
        {
          'text-lg': size === 'lg',
          'text-sm': size === 'sm',
        },
      )}
    >
      {children}
    </Text>
  )
}
