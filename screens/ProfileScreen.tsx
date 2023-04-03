import { View, Button } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import useUserInfoStore from '../zustand/userStore'

const ProfileScreen = () => {
  const { updateUserInfo, setAuth } = useUserInfoStore((state) => state)

  const logoutHandler = async () => {
    updateUserInfo({
      _id: '',
      name: '',
      token: null,
      email: '',
      role: '',
    })
    setAuth(false)
  }

  return (
    <Layout>
      <View className='View items-center'>
        <Button title='Logout' onPress={logoutHandler} />
      </View>
    </Layout>
  )
}

export default ProfileScreen
