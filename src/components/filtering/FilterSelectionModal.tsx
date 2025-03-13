import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { Modal } from '../ui/Modal'

type FilterSelectionModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  currentSelection?: string | number | null
  onChange: (id: string) => void
  filterTitle: string
  items: {
    id: string
    name: string
  }[]
}

export default function FilterSelectionModal({
  modalRef,
  onChange,
  currentSelection,
  items,
  filterTitle,
}: FilterSelectionModalProps) {
  return (
    <Modal ref={modalRef} heightPercentage="40%">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="border-b-2 border-gray-800 pb-4 mb-4 px-4">
          <Text className="text-gray-50 font-pbold text-xl">{filterTitle}</Text>
        </View>
        {items.map((opt) => (
          <View
            key={opt.id}
            className={`flex-row items-center justify-between px-4 py-4 ${String(currentSelection) === opt.id && 'bg-gray-950'}`}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onChange(String(opt.id))}
            >
              <Text className="text-gray-50 font-pregular text-lg ">
                {opt.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Modal>
  )
}
