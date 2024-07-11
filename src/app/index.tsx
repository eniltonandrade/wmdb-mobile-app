import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import LogoLoading from '@/components/LogoLoading'
import Button from '@/components/ui/Button'
import { useSession } from '@/contexts/authContext'
import { useUser } from '@/contexts/userContext'

const Welcome = () => {
  const { session, isLoading } = useSession()
  const { loadUserData, user, isLoading: isLoadingUser } = useUser()

  console.log(session)

  if (isLoading || isLoadingUser) {
    return <LogoLoading />
  }

  if (session) {
    loadUserData()
    if (user && user.id) {
      return <Redirect href="/home" />
    }
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
