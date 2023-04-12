import { Text, View } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import useUserInfoStore from '../zustand/userStore'
import { NavigationProps } from '../navigation/BottomTabNavigation'
import { useIsFocused } from '@react-navigation/native'

interface Props {
  navigation: NavigationProps
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { userInfo, isAuth } = useUserInfoStore((state) => state)

  const isFocused = useIsFocused()

  React.useEffect(() => {
    // if (!isAuth) {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'Welcome' }],
    //   })
    // }
  }, [isAuth, isFocused])

  return (
    <Layout>
      <View className='flex-1'>
        <View className='mx-4 '>
          <Text>Hello Home Screen</Text>
        </View>
      </View>
    </Layout>
  )
}

export default HomeScreen
