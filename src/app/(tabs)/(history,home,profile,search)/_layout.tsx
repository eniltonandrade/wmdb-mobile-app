import { Stack } from 'expo-router'

export const unstable_settings = {
  home: {
    initialRouteName: 'home/index',
  },
  history: {
    initialRouteName: 'history/index',
  },
  profile: {
    initialRouteName: 'profile/index',
  },
  search: {
    initialRouteName: 'search/index',
  },
}

export default function StackLayout({ segment }: { segment: string }) {
  if (segment === '(home)') {
    return (
      <Stack>
        <Stack.Screen
          name="home/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[movieId]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="person/[personId]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    )
  }
  if (segment === '(search)') {
    return (
      <Stack>
        <Stack.Screen
          name="search/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[movieId]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="person/[personId]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    )
  }
  if (segment === '(history)') {
    return (
      <Stack>
        <Stack.Screen
          name="history/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[movieId]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="person/[personId]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    )
  }

  if (segment === '(profile)') {
    return (
      <Stack>
        <Stack.Screen
          name="profile/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[movieId]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="person/[personId]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="stats/genres" options={{ headerShown: false }} />
        <Stack.Screen name="stats/cast" options={{ headerShown: false }} />
        <Stack.Screen name="stats/crew" options={{ headerShown: false }} />
        <Stack.Screen name="stats/companies" options={{ headerShown: false }} />
        <Stack.Screen
          name="stats/released-year"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="stats/watched-year"
          options={{ headerShown: false }}
        />
      </Stack>
    )
  }

  return (
    <Stack>
      <Stack.Screen
        name="home/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="movie/[movieId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
