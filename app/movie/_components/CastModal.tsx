import { View, Text, Pressable } from 'react-native'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

import { Modal } from '@/components/ui/Modal'
import { Cast } from '@/services/tmdb/models/credits'
import Avatar from '@/components/ui/Avatar'
import { tmdbImage } from '@/utils/image'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { FlatList } from 'react-native-gesture-handler'

type CastModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  cast: Cast[]
}

export default function CastModal({ modalRef, cast }: CastModalProps) {
  return (
    <Modal modalRef={modalRef} heightPercentage="85%">
      <View className="flex-1 px-4">
        <Text className="text-xl font-pbold text-gray-100 mb-4">Elenco</Text>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
          }}
          data={cast}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.cast_id)}
          renderItem={({ item }) => {
            return (
              <View className="bg-gray-800 rounded-lg w-full flex-row px-4 py-2 mb-4 space-x-4 items-center">
                <Avatar size="md" uri={tmdbImage(item.profile_path)} />
                <View className="flex-1">
                  <Text className="text-gray-100  font-pbold">{item.name}</Text>
                  <Text className="text-gray-400 text-xs font-pregular">
                    {item.character}
                  </Text>
                </View>
                <Pressable>
                  <Feather
                    name="arrow-right"
                    size={16}
                    color={colors.gray[100]}
                  />
                </Pressable>
              </View>
            )
          }}
        />
        {/* <ScrollView>
          {cast.map((person) => {
            return (
              <View
                className="bg-gray-800 rounded-lg w-full flex-row px-4 py-2 mb-4 space-x-4 items-center"
                key={person.cast_id}
              >
                <Avatar size="md" uri={tmdbImage(person.profile_path)} />
                <View className="flex-1">
                  <Text className="text-gray-100  font-pbold">
                    {person.name}
                  </Text>
                  <Text className="text-gray-400 text-xs font-pregular">
                    {person.character}
                  </Text>
                </View>
                <Pressable>
                  <Feather
                    name="arrow-right"
                    size={16}
                    color={colors.gray[100]}
                  />
                </Pressable>
              </View>
            )
          })}
        </ScrollView> */}
      </View>
    </Modal>
  )
}
