import { useFont } from '@shopify/react-native-skia'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Bar, CartesianChart } from 'victory-native'

import { fetchWatchedYearInsightsList } from '@/services/api/fetch-watched-year-insights-list'

import { Skeleton } from './Skeleton'

export default function YearlyChart() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const font = useFont(require('../assets/fonts/Poppins-Regular.ttf'))

  const { data, isLoading } = useQuery({
    queryKey: ['api', 'insight', 'years'],
    queryFn: () =>
      fetchWatchedYearInsightsList({
        filters: {
          sort_by: 'year.asc',
        },
      }),
  })

  const filledData = useMemo(() => {
    if (!data?.results) return []
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - 9 // Last 10 years including the current year

    const yearMap = new Map(data.results.map((d) => [d.year, d]))

    const filledData = []
    for (let year = startYear; year <= currentYear; year++) {
      filledData.push(yearMap.get(year) || { year, count: null, avgRating: 0 })
    }

    return filledData
  }, [data])

  return (
    <View className="h-[150px] mt-4">
      {isLoading && !data ? (
        <View className="flex-row space-x-2 items-end">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              height={Math.random() * (150 - 50) + 50}
              className={`w-6`}
            />
          ))}
        </View>
      ) : (
        <View className="w-full h-[160px] ml-[-25px] ">
          <CartesianChart
            data={filledData}
            domainPadding={{ right: 15, left: 20, top: 20, bottom: 1 }}
            padding={{ left: 0 }}
            domain={{ x: [2016, 2025] }}
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
                roundedCorners={{ topLeft: 3, topRight: 3 }}
                labels={{ font, position: 'top', color: 'white' }}
              />
            )}
          </CartesianChart>
        </View>
      )}
    </View>
  )
}
