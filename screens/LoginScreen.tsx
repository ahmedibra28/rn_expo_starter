import { View } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import CustomInput from '../components/CustomInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../components/SubmitButton'
import { NavigationProps } from '../navigation/StackNavigation'
import apiHook from '../utils'
import useUserInfoStore from '../zustand/userStore'
import { useIsFocused } from '@react-navigation/native'
import FlashMessage, { showMessage } from 'react-native-flash-message'

const LoginScreen = ({ navigation }: NavigationProps) => {
  interface FormData {
    email: string
    password: string
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: 'info@ahmedibra.com',
      password: '123',
    },
  })

  const { updateUserInfo, setAuth, isAuth } = useUserInfoStore((state) => state)

  const isFocused = useIsFocused()

  React.useEffect(() => {
    if (isAuth) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeBottomTabs' }],
      })
    }
  }, [isAuth, isFocused])

  const login = apiHook({
    key: ['login'],
    method: 'POST',
    url: 'auth/login',
  })?.post

  const onSubmit: SubmitHandler<FormData> = (data) => {
    login
      ?.mutateAsync({ ...data, platform: 'web' })
      .then((res: any) => {
        updateUserInfo({
          _id: res._id,
          name: res.name,
          token: res.token,
          email: res.email,
          role: res.role,
        })
        setAuth(true)

        navigation.navigate('HomeBottomTabs')
      })
      .catch((err) => {
        showMessage({
          message: err,
          type: 'danger',
          icon: 'danger',
          duration: 5000,
        })
        console.log('❌❌❌❌❌❌: ', err)
      })
  }
  const isLoading = false

  return (
    <Layout>
      <FlashMessage position='top' />
      <View className='mx-4'>
        <View className='my-2 min-w-screen'>
          <CustomInput
            control={control}
            rules={{
              required: 'Email is required',
            }}
            errors={errors}
            customClassName='bg-gray-50 p-2.5 rounded-full'
            name='email'
            autoFocus={true}
            placeholder='info@ahmedibra.com'
            keyboardType='email-address'
            textContentType='emailAddress'
          />
        </View>
        <View className='my-2 min-w-screen'>
          <CustomInput
            control={control}
            rules={{
              required: 'Password is required',
            }}
            errors={errors}
            customClassName='bg-gray-50 p-2.5 rounded-full'
            name='password'
            placeholder='********'
            keyboardType='visible-password'
            secureTextEntry={true}
            textContentType='name'
          />
        </View>
        <View className='mb-2 mt-5'>
          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            buttonText='Login'
            customClassName='bg-orange-50 border-orange-500 border rounded-full'
            textClassName='text-gray-100 font-bold text-center'
          />
        </View>
        <View className='mb-2 mt-5'>
          <SubmitButton
            onPress={() => navigation.navigate('Register')}
            isLoading={isLoading}
            buttonText='Register'
            customClassName='bg-gray-100 border-orange-500 border rounded-full'
            textClassName='text-orange-50 font-bold text-center'
          />
        </View>
      </View>
    </Layout>
  )
}

export default LoginScreen
