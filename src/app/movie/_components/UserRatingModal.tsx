import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Rating } from '@kolking/react-native-rating'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Text, View } from 'react-native'
import colors from 'tailwindcss/colors'

import Button from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { queryClient } from '@/lib/react-query'
import { History } from '@/services/api/models/history'
import { HistoryDetails } from '@/services/api/models/history-details'
import { updateUserHistory } from '@/services/api/update-user-history'

type UserRatingModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  historyId?: string | null
  userRating: number
  movieId?: string
  onChangeRating: (rating: number) => void
}

export default function UserRatingModal({
  modalRef,
  historyId,
  userRating = 0,
  movieId,
  onChangeRating,
}: UserRatingModalProps) {
  function updateHistoryOnCache(historyId: string, rating: number) {
    queryClient.setQueryData<History>(['api', 'history', movieId], (oldData) =>
      oldData
        ? {
            ...oldData,
            rating,
          }
        : oldData,
    )
    const historiesListCache = queryClient.getQueriesData<{
      histories: HistoryDetails[]
    }>({
      queryKey: ['api', 'history'],
    })

    historiesListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }
      queryClient.setQueryData<{
        histories: HistoryDetails[]
      }>(cacheKey, {
        ...cacheData,
        histories: cacheData?.histories?.map((history) => {
          if (history.id === historyId) {
            return {
              ...history,
              rating,
            }
          }
          return history
        }),
      })
    })
  }

  const updateHistoryMutation = useMutation({
    mutationFn: async ({
      historyId,
      rating,
    }: {
      historyId: string
      rating: number
    }) =>
      await updateUserHistory({
        historyId,
        rating,
      }),

    async onSuccess(_, { historyId, rating }) {
      updateHistoryOnCache(historyId, rating)
    },
  })

  async function handleSaveHistory() {
    await updateHistoryMutation.mutateAsync({
      historyId: historyId!,
      rating: userRating,
    })
    modalRef.current?.close()
  }

  return (
    <Modal ref={modalRef} heightPercentage="35%">
      <View className="mx-4 flex-1  max-w-full">
        <Text className="text-xl font-pbold text-gray-100 mb-4">Avaliar</Text>
        <Text className="text-md font-pregular text-gray-100 mb-4">
          O que achou desse filme?
        </Text>
        <View className="items-center justify-center flex-1 space-y-4 my-4">
          <Rating
            size={27}
            fillColor={colors.green[500]}
            rating={userRating}
            onChange={(value) => onChangeRating(value)}
            maxRating={10}
          />
          <Text className="text-gray-100">Nota {userRating} de 10</Text>
        </View>

        <View className="flex-row flex-1 space-x-4  my-4">
          <Button
            variant="outline"
            title="Cancelar"
            handlePress={() => modalRef.current?.close()}
            isLoading={false}
            containerStyles="mr-2 flex-1"
          />

          <Button
            title="Salvar"
            handlePress={handleSaveHistory}
            isLoading={false}
            containerStyles="ml-2 flex-1 "
          />
        </View>
      </View>
    </Modal>
  )
}
