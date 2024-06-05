import { SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'
import Welcome from '@/components/Welcome'
import RecentHistory from '@/components/RecentHistory'
import Trending from '@/components/Trending'
import TopCastCarrousel from '@/components/TopCastCarrousel'

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function Home() {
  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{ paddingTop: androidPaddingCorrection }}
    >
      <ScrollView
        className="flex space-y-4"
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
