import { router } from 'expo-router'
import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { Platform, SafeAreaView, ScrollView, StatusBar } from 'react-native'

import RecentHistory from '@/components/RecentHistory'
import SearchInput from '@/components/SearchInput'
import TopCastCarrousel from '@/components/TopCastCarrousel'
import Trending from '@/components/Trending'
import Welcome from '@/components/Welcome'

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function Home() {
  function handleSearch(query: string) {
    router.push(`/search/${query}`)
  }
  const debouncedChangeHandler = useMemo(
    () => _.debounce(handleSearch, 300),
    [],
  )

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  })
  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{ paddingTop: androidPaddingCorrection }}
    >
      <ScrollView
        className="flex space-y-4 pt-8"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Welcome />
        <SearchInput handleSearch={debouncedChangeHandler} />
        <RecentHistory />
        <TopCastCarrousel />
        <Trending />
      </ScrollView>
    </SafeAreaView>
  )
}
