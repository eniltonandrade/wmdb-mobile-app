import '../../reanimateConfig'

import { Redirect, router } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import LogoLoading from '@/components/LogoLoading'
import Button from '@/components/ui/Button'
import { useSession } from '@/contexts/authContext'

const Welcome = () => {
  const { user, session, isLoading } = useSession()

  if (isLoading && !user) {
    return <LogoLoading />
  }

  if (user && user?.name && session) {
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
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
    </SafeAreaView>
  )
}

export default Welcome
