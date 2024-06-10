import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Platform, Pressable, Text, View } from 'react-native'

interface DateTimePickerModalProps {
  date: Date
  onDateChange: (date: Date) => void
}

export function DateTimePickerComponent({
  date,
  onDateChange,
}: DateTimePickerModalProps) {
  const [showTime, setShowTime] = useState(false)
  const [showDate, setShowDate] = useState(false)

  function onDateChangeHandler(
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) {
    setShowDate(false)

    if (selectedDate) {
      const newDate = new Date(date)
      newDate.setFullYear(selectedDate.getFullYear())
      newDate.setMonth(selectedDate.getMonth())
      newDate.setDate(selectedDate.getDate())
      onDateChange(newDate)
    }
  }

  function onTimeChangeHandler(
    event: DateTimePickerEvent,
    selectedTime?: Date,
  ) {
    setShowTime(false)
    if (selectedTime) {
      const newDate = new Date(date)
      newDate.setHours(selectedTime.getHours())
      newDate.setMinutes(selectedTime.getMinutes())
      onDateChange(newDate)
    }
  }

  return (
    <View>
      <View className="w-full flex-row justify-between items-center border-b-2 border-gray-800 pb-4 ">
        {Platform.OS === 'ios' && (
          <>
            <Text className="text-gray-100 text-base font-pregular">
              Assistido em:
            </Text>
            <View className="flex-row">
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={onDateChangeHandler}
              />
              <DateTimePicker
                value={date}
                mode="time"
                is24Hour={true}
                maximumDate={new Date()}
                display="default"
                onChange={onTimeChangeHandler}
              />
            </View>
          </>
        )}
        {Platform.OS === 'android' && (
          <>
            <Text className="text-gray-100 text-base font-pregular">
              Assistido em:
            </Text>
            <View className="flex-row space-x-4">
              <Pressable
                onPress={() => setShowDate(true)}
                className="border border-gray-100 p-2 rounded-md"
              >
                <Text className="text-gray-100 text-lg">
                  {date.toLocaleDateString('pt-BR')}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setShowTime(true)}
                className="border border-gray-100 p-2 rounded-md"
              >
                <Text className="text-gray-100 text-lg">
                  {date.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Pressable>
            </View>
          </>
        )}
        {showDate && (
          <DateTimePicker
            value={date}
            maximumDate={new Date()}
            mode="date"
            display="default"
            onChange={onDateChangeHandler}
          />
        )}
        {showTime && (
          <DateTimePicker
            value={date}
            maximumDate={new Date()}
            mode="time"
            display="default"
            onChange={onTimeChangeHandler}
          />
        )}
      </View>
    </View>
  )
}
