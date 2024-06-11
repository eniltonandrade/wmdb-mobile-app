import { Link } from 'expo-router'
import { useState } from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import LogoSVG from '@/assets/images/logo.svg'
import FormField from '@/components/FormField'
import Button from '@/components/ui/Button'
import { useSession } from '@/contexts/authContext'

const SignIn = () => {
  const { signInWithCredentials } = useSession()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  async function handleSignIn() {
    signInWithCredentials(form)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <LogoSVG height={90} width={90} />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Entrar no WMDB
          </Text>

          <FormField
            title="E-mail"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <FormField
            title="Senha"
            value={form.password}
            autoCapitalize="none"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <Button
            title="Entrar"
            handlePress={handleSignIn}
            containerStyles="mt-7 flex-0"
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

export default SignIn
