import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Modal } from '@/components/ui/Modal'
import { DateTimePickerComponent } from '@/components/DateTimePicker'
import Button from '@/components/ui/Button'

type CastModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  date: Date | null
  isWatched: boolean
  onDateChange: (date: Date) => void
}

export default function AddToHistoryModal({
  modalRef,
  date,
  isWatched,
  onDateChange,
}: CastModalProps) {
  const [selectedDate, setSelectedDate] = useState(date || new Date())

  function handleDateSelection() {
    if (selectedDate) {
      onDateChange(selectedDate)
    }
  }
  return (
    <Modal ref={modalRef} heightPercentage="27%">
      <View className="mx-4 ">
        <Text className="text-xl font-pbold text-gray-100 mb-4">Adicionar</Text>
        <DateTimePickerComponent
          date={date || new Date()}
          onDateChange={setSelectedDate}
        />
        <View className="flex-row flex-1 space-x-4 px-4 my-4">
          {isWatched ? (
            <Button
              variant="danger"
              title="Remover"
              handlePress={() => console.log}
              isLoading={false}
              containerStyles="mr-2"
            />
          ) : (
            <Button
              variant="outline"
              title="Cancelar"
              handlePress={() => console.log}
              isLoading={false}
              containerStyles="mr-2 flex-1"
            />
          )}

          <Button
            title="Salvar"
            handlePress={handleDateSelection}
            isLoading={false}
            containerStyles="ml-2 flex-1"
          />
        </View>
      </View>
    </Modal>
  )
}
