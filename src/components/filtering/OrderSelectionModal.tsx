import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Modal } from '../ui/Modal'

type OrderSelectionModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  currentSelection: string
  onChange: (direction: string, key: string) => void
  items: {
    name: string
    key: string
  }[]
}

export default function OrderSelectionModal({
  modalRef,
  onChange,
  currentSelection,
  items,
}: OrderSelectionModalProps) {
  const [selectedItem, selectedOrder] = currentSelection.split('.')

  return (
    <Modal ref={modalRef} heightPercentage="40%">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="border-b-2 border-gray-800 pb-4 mb-4 px-4">
          <Text className="text-white font-pbold text-xl">Classificar por</Text>
        </View>
        {items.map((opt) => (
          <View
            key={opt.key}
            className={`flex-row items-center justify-between px-4 py-4 ${selectedItem === opt.key && 'bg-gray-950'}`}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onChange('desc', opt.key)}
            >
              <Text className="text-white font-pregular text-lg ">
                {opt.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                onChange(selectedOrder === 'asc' ? 'desc' : 'asc', opt.key)
              }
            >
              {selectedItem === opt.key && (
                <MaterialCommunityIcons
                  name={selectedOrder === 'asc' ? 'arrow-down' : 'arrow-up'}
                  size={26}
                  color={colors.white}
                />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Modal>
  )
}
