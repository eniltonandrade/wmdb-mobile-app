import { SafeAreaView, ScrollView } from 'react-native'

import RecentHistory from '@/components/RecentHistory'
import TopCastCarrousel from '@/components/TopCastCarrousel'
import Trending from '@/components/Trending'
import { Container } from '@/components/ui/Container'
import Welcome from '@/components/Welcome'

export default function Home() {
  return (
    <Container>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Welcome />
          {/* fake input */}
          <RecentHistory />
          <TopCastCarrousel />
          <Trending />
        </ScrollView>
      </SafeAreaView>
    </Container>
  )
}
