import { useFont } from '@shopify/react-native-skia'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import colors from 'tailwindcss/colors'
import { Bar, CartesianChart } from 'victory-native'

import { fetchMovieCountByWatchedYear } from '@/services/api/fetch-movie-count-by-watched-year'

export default function YearlyChart() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const font = useFont(require('../assets/fonts/Poppins-Regular.ttf'))

  const { data, error: recentHistoryError } = useQuery({
    queryKey: ['api', 'report', 'movies', 'count', 'year'],
    queryFn: () => fetchMovieCountByWatchedYear(),
  })

  useEffect(() => {
    if (recentHistoryError?.message) {
      console.log(recentHistoryError.message)
      if (recentHistoryError instanceof AxiosError) {
        console.log(recentHistoryError.response?.data)
        Toast.show({
          type: 'error',
          text1: `Não foi possível acessar a API.`,
          text2: recentHistoryError?.response?.data.message,
        })
        if (recentHistoryError.response?.status === 401) {
          router.replace('/sign-in')
        }
      }
    }
  }, [recentHistoryError])

  if (!data) {
    return null
  }

  return (
    <View className="h-[150px]">
      <CartesianChart
        data={data}
        domainPadding={{ right: 40, left: 10, top: 15 }}
        padding={{ left: 0 }}
        xKey="year"
        yKeys={['count']}
        axisOptions={{
          font,
          labelColor: 'white',
          labelOffset: {
            x: 8,
            y: 8,
          },
          formatYLabel: () => '',
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            points={points.count}
            chartBounds={chartBounds}
            color={colors.green[500]}
            animate={{ type: 'timing', duration: 1000 }}
            roundedCorners={{ topLeft: 5, topRight: 5 }}
            labels={{ font, position: 'top', color: 'white' }}
          />
        )}
      </CartesianChart>
    </View>
  )
}
