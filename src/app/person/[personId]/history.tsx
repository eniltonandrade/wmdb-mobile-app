import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import Loading from '@/components/Loading'
import {
  MovieHistoryList,
  MovieHistoryListRef,
} from '@/components/MovieHistoryList'
import { usePerson } from '@/contexts/personContext'
import { FetchUseHistoryFilters } from '@/services/api/fetch-user-history'

export default function PersonHistory() {
  const { insights } = usePerson()

  const movieHistoryListRef = useRef<MovieHistoryListRef>(null)

  const [params, setParams] = useState<FetchUseHistoryFilters>(
    {} as FetchUseHistoryFilters,
  )

  useEffect(() => {
    if (insights) {
      setParams((prev) => {
        return {
          ...prev,
          sort_by: 'watched_date.desc',
          person_id: String(insights?.data?.person.id),
        }
      })
    }
  }, [insights])

  if (insights?.isLoading) return <Loading />

  return (
    <View className="bg-primary h-full flex space-y-4 pt-4">
      {params.person_id && (
        <MovieHistoryList
          ref={movieHistoryListRef}
          displayMethod={'GRID'}
          params={params}
          setParams={setParams}
        />
      )}
    </View>
  )
}
