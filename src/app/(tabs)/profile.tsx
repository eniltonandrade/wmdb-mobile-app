import { View } from 'react-native'

import Button from '@/components/ui/Button'
import { useSession } from '@/contexts/authContext'

export default function Profile() {
  const { signOut } = useSession()
  return (
    <View className="flex-1 h-full w-full items-center justify-center">
      <Button title="Sair" variant="outline" handlePress={signOut} />
    </View>
  )
}
