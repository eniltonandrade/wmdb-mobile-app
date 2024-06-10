import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

type FormFieldProps = {
  title: string
  value: string
  handleChangeText: () => void
  otherStyles: string
}

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps & React.ComponentPropsWithoutRef<typeof TextInput>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              size={6}
              color={colors.gray[100]}
              name={!showPassword ? 'eye' : 'eye-off'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
