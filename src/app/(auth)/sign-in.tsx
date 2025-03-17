import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import LogoSVG from '@/assets/images/logo.svg'
import FormField from '@/components/FormField'
import Button from '@/components/ui/Button'
import { useSession } from '@/contexts/authContext'

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Por favor, insira seu endereço de e-mail.')
    .email('Por favor, insira um endereço de e-mail válido.'),

  password: z
    .string()
    .min(1, 'Por favor, insira sua senha.')
    .min(6, 'Sua senha deve ter pelo menos 8 caracteres.'),
})

export type LoginFormProps = z.infer<typeof loginFormSchema>

const SignIn = () => {
  const { signInWithCredentials, isLoading } = useSession()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn(values: LoginFormProps) {
    signInWithCredentials(values)
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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="E-mail"
                value={value}
                handleChangeText={onChange}
                otherStyles="mt-7"
                autoCapitalize="none"
                keyboardType="email-address"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="Senha"
                value={value}
                isPassword
                handleChangeText={onChange}
                otherStyles="mt-7"
                autoCapitalize="none"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Entrar"
            handlePress={handleSubmit(handleSignIn)}
            containerStyles="mt-7 flex-0"
            isLoading={isLoading}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-50 font-pregular">
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
