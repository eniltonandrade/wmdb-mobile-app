import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { RATING_SOURCES_OPTIONS } from '@/constants/utils'
import { PreferredRatingType } from '@/services/api/fetch-company-stats'

import { Modal } from '../ui/Modal'

type RatingSelectionModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  currentSelection: PreferredRatingType
  onChange: (key: PreferredRatingType) => void
}

export default function RatingSelectionModal({
  modalRef,
  onChange,
  currentSelection,
}: RatingSelectionModalProps) {
  return (
    <Modal ref={modalRef} heightPercentage="45%">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="border-b-2 border-gray-800 pb-4 mb-4 px-4">
          <Text className="text-gray-50 font-pbold text-xl">Notas por</Text>
        </View>
        {RATING_SOURCES_OPTIONS.map((opt) => (
          <View
            key={opt.key}
            className={`flex-row items-center justify-between px-4 py-4 ${currentSelection === opt.key && 'bg-gray-950'}`}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onChange(opt.key as PreferredRatingType)}
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
