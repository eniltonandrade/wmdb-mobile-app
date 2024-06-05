import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Redirect } from 'expo-router'

const Welcome = () => {
  const isLogged = true
  // eslint-disable-next-line no-constant-condition
  if (isLogged) {
    return <Redirect href="/home" />
  } else {
    return <Redirect href="/sign-in" />
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4"></View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default Welcome
