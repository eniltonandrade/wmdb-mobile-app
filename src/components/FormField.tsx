import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

type FormFieldProps = {
  title: string
  value: string
  handleChangeText: (text: string) => void
  otherStyles: string
  errorMessage?: string
  isPassword?: boolean
}

const FormField = ({
  title,
  value,
  handleChangeText,
  errorMessage,
  otherStyles,
  isPassword,
  ...props
}: FormFieldProps & React.ComponentPropsWithoutRef<typeof TextInput>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-50 font-pmedium">{title}</Text>

      <View className="w-full h-12 px-4 bg-black-100 rounded-xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              size={16}
              color={colors.gray[100]}
              name={!showPassword ? 'eye' : 'eye-off'}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
    </View>
  )
}

export default FormField
