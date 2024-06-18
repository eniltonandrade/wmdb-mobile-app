import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import clsx from 'clsx'
import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { utils } from '@/constants'
import { useApp } from '@/contexts/appContext'
import { queryParams, SortType } from '@/services/api/fetch-user-history'

import Button from './ui/Button'
import { Modal } from './ui/Modal'

type HistoryFiltersModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  setParams: React.Dispatch<React.SetStateAction<queryParams>>
  selectedFilters: queryParams
}

export default function HistoryFiltersModal({
  modalRef,
  selectedFilters,
  setParams,
}: HistoryFiltersModalProps) {
  const { genres } = useApp()
  const [filters, setFilters] = useState(selectedFilters)

  const [selectedField, selectedOrder] = filters.sort_by.split('.')

  function applyFilters() {
    setParams(filters)
    modalRef.current?.dismiss()
  }

  function cleanFilters() {
    setFilters({
      sort_by: 'watched_date.desc',
    })
    setParams({
      sort_by: 'watched_date.desc',
    })
    modalRef.current?.dismiss()
  }

  function handleSelect(section: string, key: string) {
    if (section === 'order') {
      const sortBy = (key + '.' + selectedOrder) as SortType
      setFilters((prev) => {
        return {
          ...prev,
          sort_by: sortBy,
        }
      })
    }
    if (section === 'direction') {
      const sortBy = (selectedField + '.' + key) as SortType
      setFilters((prev) => {
        return {
          ...prev,
          sort_by: sortBy,
        }
      })
    }
    if (section === 'genre') {
      setFilters((prev) => {
        return {
          ...prev,
          genre_id: key,
        }
      })
    }
  }

  return (
    <Modal ref={modalRef} heightPercentage="85%">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        <Text className="text-xl font-pbold text-gray-100 mb-4">Filtros</Text>
        <View>
          <Text className="text-base font-psemibold text-gray-100 mb-2">
            Direção
          </Text>
          <View className="flex-row items-center space-x-2">
            {utils.SORT_LIST.direction.map((dir) => {
              const isSelected = selectedOrder === dir.key
              return (
                <Pressable
                  key={dir.key}
                  onPress={() => handleSelect('direction', dir.key)}
                  className={clsx(
                    `border border-gray-100 rounded-lg p-2 mb-2`,
                    {
                      'bg-secondary border-secondary-100': isSelected,
                    },
                  )}
                >
                  <Text
                    className={clsx(`text-xs font-pregular text-gray-100`, {
                      'text-primary': isSelected,
                    })}
                  >
                    {dir.name}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>
        <View className="my-2">
          <Text className="text-base font-psemibold text-gray-100 mb-2">
            Ordenar Por:
          </Text>
          <View className="flex-row flex-wrap items-center">
            {utils.SORT_LIST.order.map((dir) => {
              const isSelected = selectedField === dir.key
              return (
                <Pressable
                  onPress={() => handleSelect('order', dir.key)}
                  key={dir.key}
                  className={clsx(
                    `border border-gray-100 rounded-lg p-2 mr-2 mb-2`,
                    {
                      'bg-secondary border-secondary-100': isSelected,
                    },
                  )}
                >
                  <Text
                    className={clsx(`text-xs font-pregular text-gray-100`, {
                      'text-primary': isSelected,
                    })}
                  >
                    {dir.name}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>
        <View className="my-2">
          <Text className="text-base font-psemibold text-gray-100 mb-2">
            Gêneros:
          </Text>
          <View className="flex-row flex-wrap items-center">
            {genres.map((genre) => {
              const isSelected = filters.genre_id === genre.id
              return (
                <Pressable
                  onPress={() => handleSelect('genre', genre.id)}
                  key={genre.id}
                  className={clsx(
                    `border border-gray-100 rounded-lg p-2 mr-2 mb-2`,
                    {
                      'bg-secondary border-secondary-100': isSelected,
                    },
                  )}
                >
                  <Text
                    className={clsx(`text-xs font-pregular text-gray-100`, {
                      'text-primary': isSelected,
                    })}
                  >
                    {genre.name}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>
      </ScrollView>
      <View className="flex-row space-x-4 px-4 my-6">
        <Button
          variant="outline"
          title="Limpar filtros"
          handlePress={cleanFilters}
          isLoading={false}
          containerStyles="mr-2 flex-1"
        />

        <Button
          title="Aplicar"
          handlePress={applyFilters}
          isLoading={false}
          containerStyles="mr-2 flex-1"
        />
      </View>
    </Modal>
  )
}
