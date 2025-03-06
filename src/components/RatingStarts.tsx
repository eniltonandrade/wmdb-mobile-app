import { FontAwesome } from '@expo/vector-icons'
import { View } from 'react-native'

export default function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <View className="flex-row space-x-1">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <FontAwesome
          key={`full-${index}`}
          name="star"
          size={32}
          color="#facc15"
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <FontAwesome name="star-half-full" size={32} color="#facc15" />
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <FontAwesome
          key={`empty-${index}`}
          name="star"
          size={32}
          color="#374151"
        />
      ))}
    </View>
  )
}
