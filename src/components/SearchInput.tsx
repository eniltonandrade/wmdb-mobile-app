import { FontAwesome } from '@expo/vector-icons'
import _ from 'lodash'
import { TextInput, View } from 'react-native'
import colors from 'tailwindcss/colors'

type SearchInputProps = {
  initialQuery?: string
  handleSearch: _.DebouncedFunc<(query: string) => void>
}

export default function SearchInput({ handleSearch }: SearchInputProps) {
  return (
    <View className="flex flex-row items-center space-x-4 h-12 mx-4 mb-4 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder="Busque por um filme ou artista"
        placeholderTextColor="#CDCDE0"
        onChangeText={handleSearch}
      />

      <View>
        <FontAwesome name="search" size={16} color={colors.gray[100]} />
      </View>
    </View>
  )
}
