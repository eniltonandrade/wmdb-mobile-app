import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

type UserActionsProps = {
  watchedDate: Date | null
  userRating?: number | null
  handleOpenHistoryModal: () => void
  handleOpenUserRatingModal: () => void
}

export default function UserActions({
  watchedDate,
  handleOpenHistoryModal,
  handleOpenUserRatingModal,
  userRating,
}: UserActionsProps) {
  return (
    <View className="w-full flex flex-row space-x-4 mt-4 ">
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity
          className={`bg-gray-900 p-2 rounded-md`}
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
            className={`bg-gray-900 p-2 rounded-md`}
            activeOpacity={0.8}
            onPress={handleOpenUserRatingModal}
          >
            <Feather
              name={userRating ? 'check' : 'plus'}
              size={20}
              color={userRating ? colors.white : colors.green[500]}
            />
          </TouchableOpacity>
          {userRating ? (
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
