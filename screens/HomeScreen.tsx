import { View } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import useUserInfoStore from '../zustand/userStore'
import { NavigationProps } from '../navigation/BottomTabNavigation'
import { useIsFocused } from '@react-navigation/native'
import ClientHomeScreen from '../components/ClientHomeScreen'
import Avatar from '../components/Avatar'
import AdminHomeScreen from '../components/AdminHomeScreen'
import Notification from '../components/Notification'
import BarberHomeScreen from '../components/BarberHomeScreen'

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
      <View className='mx-4 flex-1'>
        {/* <AdminHomeScreen navigation={navigation} userInfo={userInfo} /> */}
        {/* <ClientHomeScreen navigation={navigation} userInfo={userInfo} /> */}
        <BarberHomeScreen navigation={navigation} userInfo={userInfo} />
      </View>
    </Layout>
  )
}

export default HomeScreen
