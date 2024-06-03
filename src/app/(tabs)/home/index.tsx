import { SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native'
import Welcome from './_components/Welcome'
import RecentHistory from './_components/RecentHistory'
import Trending from './_components/Trending'

const androidPaddingCorrection =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0

export default function Home() {
  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{ paddingTop: androidPaddingCorrection }}
    >
      <ScrollView
        className="flex my-6 space-y-4"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Welcome />
        <RecentHistory />
        <Trending />
      </ScrollView>
    </SafeAreaView>
  )
}
