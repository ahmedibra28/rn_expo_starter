import { Text, View } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import useUserInfoStore from '../zustand/userStore'
import { NavigationProps } from '../navigation/StackNavigation'
import { useIsFocused } from '@react-navigation/native'

const HomeScreen = ({ navigation }: NavigationProps) => {
  const { userInfo, isAuth } = useUserInfoStore((state) => state)

  const isFocused = useIsFocused()

  React.useEffect(() => {
    if (!isAuth) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    }
  }, [isAuth, isFocused])

  return (
    <Layout>
      <View className='View items-center'>
        <Text className='text-blue-500 text-lg'>Hi, I'm {userInfo?.name}</Text>
      </View>
    </Layout>
  )
}

export default HomeScreen
