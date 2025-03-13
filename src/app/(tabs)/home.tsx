import { router } from 'expo-router'
import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

import RecentHistory from '@/components/RecentHistory'
import SearchInput from '@/components/SearchInput'
import TopCastCarrousel from '@/components/TopCastCarrousel'
import Trending from '@/components/Trending'
import { Container } from '@/components/ui/Container'
import Welcome from '@/components/Welcome'

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
    <Container>
      <SafeAreaView>
        <ScrollView
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
    </Container>
  )
}
