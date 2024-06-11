import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Loading from '@/components/Loading'
import Button from '@/components/ui/Button'
import { useSession } from '@/contexts/authContext'

const Welcome = () => {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return <Loading />
  }

  if (session) {
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Button
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default Welcome
