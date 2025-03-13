import { View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import colors from 'tailwindcss/colors'

type Props = {
  totalRunTime: number
}

export default function TimeWidget({ totalRunTime }: Props) {
  const MINUTES_IN_HOUR = 60
  const HOURS_IN_DAY = 24
  const DAYS_IN_MONTH = 30 // Approximate

  const months = Math.floor(
    totalRunTime / (MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_MONTH),
  )
  const days = Math.floor(
    (totalRunTime % (MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_MONTH)) /
      (MINUTES_IN_HOUR * HOURS_IN_DAY),
  )
  const hours = Math.floor(
    (totalRunTime % (MINUTES_IN_HOUR * HOURS_IN_DAY)) / MINUTES_IN_HOUR,
  )
  const minutes = totalRunTime % MINUTES_IN_HOUR

  return (
    <View className="w-full flex-row justify-between items-center px-2 my-4">
      <CircularProgress
        value={months}
        radius={42}
        duration={2000}
        progressValueColor={colors.gray['50']}
        maxValue={12}
        title={months > 1 ? 'Meses' : 'Mês'}
        titleColor={'white'}
        titleStyle={{ fontSize: 12 }}
        activeStrokeWidth={5}
        inActiveStrokeWidth={5}
        activeStrokeColor={colors.green['700']}
        inActiveStrokeColor={colors.gray['800']}
      />
      <CircularProgress
        value={days}
        radius={42}
        duration={2000}
        progressValueColor={colors.gray['50']}
        maxValue={31}
        title={days > 1 ? 'Dias' : 'Dia'}
        titleColor={'white'}
        titleStyle={{ fontSize: 12 }}
        activeStrokeWidth={5}
        inActiveStrokeWidth={5}
        activeStrokeColor={colors.green['700']}
        inActiveStrokeColor={colors.gray['800']}
      />
      <CircularProgress
        value={hours}
        radius={42}
        duration={2000}
        progressValueColor={colors.gray['50']}
        maxValue={24}
        title={hours > 1 ? 'Horas' : 'Hora'}
        titleColor={'white'}
        titleStyle={{ fontSize: 12 }}
        activeStrokeWidth={5}
        inActiveStrokeWidth={5}
        activeStrokeColor={colors.green['700']}
        inActiveStrokeColor={colors.gray['800']}
      />
      <CircularProgress
        value={minutes}
        radius={42}
        duration={2000}
        progressValueColor={colors.gray['50']}
        maxValue={60}
        title={minutes > 1 ? 'Minutos' : 'Minuto'}
        titleColor={'white'}
        titleStyle={{ fontSize: 12 }}
        activeStrokeWidth={5}
        inActiveStrokeWidth={5}
        activeStrokeColor={colors.green['700']}
        inActiveStrokeColor={colors.gray['800']}
      />
    </View>
  )
}
