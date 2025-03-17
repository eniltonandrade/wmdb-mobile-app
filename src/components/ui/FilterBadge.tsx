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
  removable?: boolean
  Icon: JSX.Element
}

export default function FilterBadge({
  onRemoval,
  text,
  removable = false,
  Icon,
  ...rest
}: FilterBadgeProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <View className="bg-gray-900 flex-row rounded-md p-2 items-center space-x-2 mb-4 mr-2 border border-gray-500">
        {Icon}
        <Text className=" font-psemibold text-xs text-gray-50">{text}</Text>
        {removable && (
          <Pressable className="bg-gray-900 rounded-md" onPress={onRemoval}>
            <Ionicons name="close" size={18} color={colors.white} />
          </Pressable>
        )}
      </View>
    </TouchableOpacity>
  )
}
