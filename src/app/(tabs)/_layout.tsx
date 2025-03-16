import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: '#030712',
        },
        tabBarActiveTintColor: '#19B34D',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderColor: '#111827',
          backgroundColor: '#030712',
          borderTopWidth: 1,
          borderTopColor: '#111827',
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: 'Historia',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
