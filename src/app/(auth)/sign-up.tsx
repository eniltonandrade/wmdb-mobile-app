import { Link } from 'expo-router'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import LogoSVG from '@/assets/images/logo.svg'
import FormField from '@/components/FormField'
import Button from '@/components/ui/Button'

const SignUp = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <LogoSVG height={115} width={115} />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value=""
            handleChangeText={() => console.log}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value=""
            handleChangeText={() => console.log}
            otherStyles="mt-7"
          />

          <Button
            title="Sign In"
            handlePress={() => console.log}
            containerStyles="mt-7"
            isLoading={false}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Não tem uma conta?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Cadastrar
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
