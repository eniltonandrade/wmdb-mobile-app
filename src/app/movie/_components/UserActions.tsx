import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import colors from 'tailwindcss/colors'
import { History } from '@/services/api/models/history'

type UserActionsProps = {
  history?: History | null
  watchedDate: Date | null
  userRating: number
  handleOpenHistoryModal: () => void
  handleOpenUserRatingModal: () => void
}

export default function UserActions({
  history,
  watchedDate,
  handleOpenHistoryModal,
  handleOpenUserRatingModal,
  userRating,
}: UserActionsProps) {
  return (
    <View className="w-full flex flex-row space-x-4 mt-4 ">
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity
          className={`bg-gray-800 p-2 rounded-md`}
          activeOpacity={0.8}
          onPress={handleOpenHistoryModal}
        >
          <Feather
            name={watchedDate ? 'check' : 'plus'}
            size={20}
            color={watchedDate ? colors.white : colors.green[500]}
          />
        </TouchableOpacity>
        {watchedDate ? (
          <Text className="text-gray-100 font-pbold text-sm">
            {format(watchedDate, "dd'/'MM'/'yy", {
              locale: ptBR,
            })}
          </Text>
        ) : (
          <Text className="text-gray-100 font-pregular text-sm">Adicionar</Text>
        )}
      </View>
      {watchedDate && (
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            className={`bg-gray-800 p-2 rounded-md`}
            activeOpacity={0.8}
            onPress={handleOpenUserRatingModal}
          >
            <Feather
              name={history?.rating ? 'check' : 'plus'}
              size={20}
              color={history?.rating ? colors.white : colors.green[500]}
            />
          </TouchableOpacity>
          {history?.rating ? (
            <Text className="text-gray-100 font-pbold text-lg">
              {userRating.toFixed(1)}
            </Text>
          ) : (
            <Text className="text-gray-100 font-pregular text-md">Avaliar</Text>
          )}
        </View>
      )}
    </View>
  )
}
