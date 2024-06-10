import { Platform, SafeAreaView, ScrollView, StatusBar } from 'react-native'

import RecentHistory from '@/components/RecentHistory'
import TopCastCarrousel from '@/components/TopCastCarrousel'
import Trending from '@/components/Trending'
import Welcome from '@/components/Welcome'

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function Home() {
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
        <RecentHistory />
        <TopCastCarrousel />
        <Trending />
      </ScrollView>
    </SafeAreaView>
  )
}
