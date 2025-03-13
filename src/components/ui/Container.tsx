import React, { ReactNode } from 'react'
import { Platform, StatusBar, View } from 'react-native'

export type ContainerProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}
const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export function Container({ children }: ContainerProps) {
  return (
    <View
      style={{ paddingTop: androidPaddingCorrection }}
      className="bg-primary h-full flex space-y-4 pt-8"
    >
      {children}
    </View>
  )
}
