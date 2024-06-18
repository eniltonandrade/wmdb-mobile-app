import { FontAwesome } from '@expo/vector-icons'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { useQuery } from '@tanstack/react-query'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

import { getMovieById } from '@/services/api/get-movie-by-id'

import { Modal } from './ui/Modal'

type MovieActionsModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  movieId?: string | null
}

export default function MovieActionsModal({
  modalRef,
  movieId,
}: MovieActionsModalProps) {
  const { data: movie } = useQuery({
    queryKey: ['api', 'movie', movieId],
    queryFn: () => getMovieById({ movieId }),
    enabled: !!movieId,
  })

  return (
    <Modal ref={modalRef} heightPercentage="20%">
      <View className="p-4 space-y-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-xl font-pbold text-gray-100">
              {movie?.title}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-gray-800 p-2 rounded-lg"
            onPress={() => modalRef.current?.close()}
          >
            <FontAwesome name="close" color={colors.gray[100]} size={18} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row space-x-4 items-center"
        >
          <FontAwesome name="trash" color={colors.red[500]} size={24} />
          <Text className="text-base text-white">Remover do histórico</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
