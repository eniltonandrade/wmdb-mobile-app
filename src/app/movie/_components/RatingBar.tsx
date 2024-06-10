import { View, Text } from 'react-native'
import React from 'react'

import ImdbLogo from '@/assets/icons/imdb_logo.svg'
import TmdbLogo from '@/assets/icons/tmdb_logo.svg'
import Metacritic from '@/assets/icons/metacritic_logo.svg'
import Tomatoes from '@/assets/icons/tomatometer-aud_score-fresh.svg'
import Animated, { FadeInDown } from 'react-native-reanimated'

const mapper: Record<string, React.ReactNode> = {
  'Internet Movie Database': <ImdbLogo height={24} width={24} />,
  'Rotten Tomatoes': <Tomatoes height={24} width={24} />,
  Metacritic: <Metacritic height={24} width={24} />,
}

type RatingBarProps = {
  tmdbRating: number
  Ratings: {
    Source: string
    Value: string
  }[]
} & React.ComponentPropsWithoutRef<typeof View>

export default function RatingBar({
  tmdbRating,
  Ratings,
  ...rest
}: RatingBarProps) {
  return (
    <Animated.View entering={FadeInDown.duration(600)}>
      <View className="w-full px-4 my-6 flex flex-row space-x-4" {...rest}>
        <View className="flex-row items-center space-x-2">
          <View className="bg-gray-800 p-2 rounded-md">
            <TmdbLogo height={24} width={24} />
          </View>
          <Text className="text-gray-100 font-pbold text-lg">
            {tmdbRating.toFixed(1)}
          </Text>
        </View>

        {Ratings.map((rating) => (
          <View className="flex-row items-center space-x-2" key={rating.Source}>
            <View className="bg-gray-800 p-2 rounded-md">
              {mapper[rating.Source]}
            </View>
            <Text className="text-gray-100 font-pbold text-lg">
              {rating.Value.split('/')[0]}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  )
}
