import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import StackNavigation from './navigation/StackNavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App() {
  const queryClient = new QueryClient()
  return (
    <SafeAreaProvider>
      <StatusBar style='auto' />
      <QueryClientProvider client={queryClient}>
          <StackNavigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
