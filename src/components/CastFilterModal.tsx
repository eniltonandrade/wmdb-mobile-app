import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import clsx from 'clsx'
import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { SORT_LIST } from '@/constants/utils'
import {
  PreferredRatingType,
  QueryParams,
  SortType,
} from '@/services/api/fetch-people-insights-list'

import Button from './ui/Button'
import { Modal } from './ui/Modal'

type CastFiltersModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  setParams: React.Dispatch<React.SetStateAction<QueryParams>>
  selectedFilters: QueryParams
}

export default function CastFiltersModal({
  modalRef,
  selectedFilters,
  setParams,
}: CastFiltersModalProps) {
  const [filters, setFilters] = useState(selectedFilters)

  const [selectedField, selectedOrder] = filters.sort_by.split('.')

  function applyFilters() {
    setParams(filters)
    modalRef.current?.dismiss()
  }

  function cleanFilters() {
    setFilters({
      sort_by: 'count.desc',
      preferred_rating: 'imdb_rating',
    })
    setParams({
      sort_by: 'count.desc',
      preferred_rating: 'imdb_rating',
    })
    modalRef.current?.dismiss()
  }

  function handleSelect(section: string, key: string | number) {
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
    if (section === 'preferred_rating') {
      setFilters((prev) => {
        return {
          ...prev,
          preferred_rating: key as PreferredRatingType,
        }
      })
    }
    if (section === 'gender') {
      setFilters((prev) => {
        return {
          ...prev,
          gender: Number(key),
        }
      })
    }
  }

  return (
    <Modal ref={modalRef} heightPercentage="85%">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="border-b-2 border-gray-800 pb-4 mb-4 px-4">
          <Text className="text-white font-pbold text-xl">Filtro</Text>
        </View>
        <View className=" px-4">
          <Text className="text-base font-psemibold text-gray-50 mb-2">
            Direção
          </Text>
          <View className="flex-row items-center space-x-2">
            {SORT_LIST.direction.map((dir) => {
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
                    className={clsx(`text-xs font-pregular text-gray-50`, {
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
        <View className="my-2 px-4">
          <Text className="text-base font-psemibold text-gray-50 mb-2">
            Ordenar Por:
          </Text>
          <View className="flex-row flex-wrap items-center">
            {[
              {
                name: 'Nota',
                key: 'average',
              },
              {
                name: 'Total',
                key: 'count',
              },
            ].map((dir) => {
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
                    className={clsx(`text-xs font-pregular text-gray-50`, {
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
        <View className="my-2 px-4">
          <Text className="text-base font-psemibold text-gray-50 mb-2">
            Notas de:
          </Text>
          <View className="flex-row flex-wrap items-center">
            {[
              {
                name: 'Nota IMDB',
                key: 'imdb_rating',
              },
              {
                name: 'Nota TMDB',
                key: 'tmdb_rating',
              },
              {
                name: 'Nota Rotten Tomatoes',
                key: 'rotten_tomatoes_rating',
              },
              {
                name: 'Nota Metacritic',
                key: 'metacritic_rating',
              },
            ].map((rating) => {
              const isSelected = filters.preferred_rating === rating.key
              return (
                <Pressable
                  onPress={() => handleSelect('preferred_rating', rating.key)}
                  key={rating.key}
                  className={clsx(
                    `border border-gray-100 rounded-lg p-2 mr-2 mb-2`,
                    {
                      'bg-secondary border-secondary-100': isSelected,
                    },
                  )}
                >
                  <Text
                    className={clsx(`text-xs font-pregular text-gray-50`, {
                      'text-primary': isSelected,
                    })}
                  >
                    {rating.name}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>
        <View className="my-2 px-4">
          <Text className="text-base font-psemibold text-gray-50 mb-2">
            Gênero:
          </Text>
          <View className="flex-row flex-wrap items-center">
            {[
              {
                name: 'Atores',
                key: 2,
              },
              {
                name: 'Atrizes',
                key: 1,
              },
            ].map((gender) => {
              const isSelected = filters.gender === gender.key
              return (
                <Pressable
                  onPress={() => handleSelect('gender', gender.key)}
                  key={gender.key}
                  className={clsx(
                    `border border-gray-100 rounded-lg p-2 mr-2 mb-2`,
                    {
                      'bg-secondary border-secondary-100': isSelected,
                    },
                  )}
                >
                  <Text
                    className={clsx(`text-xs font-pregular text-gray-50`, {
                      'text-primary': isSelected,
                    })}
                  >
                    {gender.name}
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
