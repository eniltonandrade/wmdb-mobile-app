import { Feather } from '@expo/vector-icons'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import { router, useLocalSearchParams, withLayoutContext } from 'expo-router'
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import PersonHeader from '@/components/PersonHeader'
import { PersonProvider } from '@/contexts/personContext'

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function PersonLayout() {
  const { personId: PersonTmdbId } = useLocalSearchParams()
  return (
    <PersonProvider id={String(PersonTmdbId)}>
      <SafeAreaView
        className="bg-primary flex-1"
        style={{ paddingTop: androidPaddingCorrection }}
      >
        <View className="flex-row justify-between items-center mb-4 px-4">
          <View className="flex flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-10 w-5 intems-center justify-center"
            >
              <Feather name="arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <PersonHeader />
        <MaterialTopTabs
          screenOptions={{
            tabBarActiveTintColor: '#19B34D',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarIndicatorStyle: {
              backgroundColor: '#19B34D',
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 14,
            },
            tabBarStyle: {
              borderColor: '#111827',
              backgroundColor: '#030712',
              marginBottom: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#111827',
            },
          }}
        >
          <MaterialTopTabs.Screen
            name="index"
            options={{ title: 'Detalhes' }}
          />
          <MaterialTopTabs.Screen
            name="insights"
            options={{ title: 'Insights' }}
          />
          <MaterialTopTabs.Screen
            name="history"
            options={{ title: 'História' }}
          />
        </MaterialTopTabs>
      </SafeAreaView>
    </PersonProvider>
  )
}
