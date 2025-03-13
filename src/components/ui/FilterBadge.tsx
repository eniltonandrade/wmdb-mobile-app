import { Ionicons } from '@expo/vector-icons'
import {
  Pressable,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

export type FilterBadgeProps = TouchableOpacityProps & {
  text?: string | null
  onRemoval?: () => void | null
  removable: boolean
}

export default function FilterBadge({
  onRemoval,
  text,
  removable = false,
  ...rest
}: FilterBadgeProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <View className="bg-gray-900 flex-row rounded-md py-1 px-2 items-center space-x-2 mb-4 ml-2 h-[26px]">
        <Ionicons name="filter" color={colors.white} />
        <Text className=" font-psemibold text-xs text-gray-100">{text}</Text>
        {removable && (
          <Pressable className="bg-gray-900 rounded-md" onPress={onRemoval}>
            <Ionicons name="close" size={18} color={colors.white} />
          </Pressable>
        )}
      </View>
    </TouchableOpacity>
  )
}
