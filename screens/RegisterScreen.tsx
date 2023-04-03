import { View, Text } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import SubmitButton from '../components/SubmitButton'
import { NavigationProps } from '../navigation/StackNavigation'
import useUserInfoStore from '../zustand/userStore'
import { useIsFocused } from '@react-navigation/native'

const RegisterScreen = ({ navigation }: NavigationProps) => {
  const { isAuth } = useUserInfoStore((state) => state)

  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isAuth) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeBottomTabs' }],
      })
    }
  }, [isAuth, isFocused])

  return (
    <Layout>
      <View className='mx-4'>
        <Text className='text-orange-50 text-sm text-center'>
          Register Screen
        </Text>
        <View className='mb-2 mt-5'>
          <SubmitButton
            onPress={() => navigation.navigate('Login')}
            isLoading={false}
            buttonText='Login'
            customClassName='bg-gray-100 border-orange-500 border rounded-full'
            textClassName='text-orange-50 font-bold text-center'
          />
        </View>
      </View>
    </Layout>
  )
}

export default RegisterScreen
