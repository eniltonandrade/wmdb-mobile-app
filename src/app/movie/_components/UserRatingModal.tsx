import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Modal } from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { updateUserHistory } from '@/services/api/update-user-history'
import { Rating } from '@kolking/react-native-rating'
import colors from 'tailwindcss/colors'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

type UserRatingModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  historyId?: string | null
  userRating?: number | null
}

export default function UserRatingModal({
  modalRef,
  historyId,
  userRating,
}: UserRatingModalProps) {
  const [rating, setRating] = useState(userRating || 0)

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

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['api', 'history'],
      }),
  })

  async function handleSaveHistory() {
    await updateHistoryMutation.mutateAsync({
      historyId: historyId!,
      rating,
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
            rating={rating}
            onChange={(value) => setRating(value)}
            maxRating={10}
          />
          <Text className="text-gray-100">Nota {rating} de 10</Text>
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
