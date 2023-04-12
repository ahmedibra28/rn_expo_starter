import { Text, View } from 'react-native'
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
import Header from '../components/Header'

interface FormData {
  mobile: number
}

const LoginScreen = ({ navigation }: NavigationProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
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
    navigation.navigate('OTP')
    // login
    //   ?.mutateAsync({ ...data, platform: 'web' })
    //   .then((res: any) => {
    //     updateUserInfo({
    //       _id: res._id,
    //       name: res.name,
    //       token: res.token,
    //       email: res.email,
    //       role: res.role,
    //     })
    //     setAuth(true)
    //     navigation.navigate('HomeBottomTabs')
    //   })
    //   .catch((err) => {
    //     showMessage({
    //       message: err,
    //       type: 'danger',
    //       icon: 'danger',
    //       duration: 5000,
    //     })
    //     console.log('❌❌❌❌❌❌: ', err)
    //   })
  }
  const isLoading = false

  return (
    <Layout>
      <View className='flex-1'>
        <FlashMessage position='top' />
        <Header />

        <View className='mx-4'>
          <View className='mb-10'>
            <Text className='text-primary text-3xl font-bold'>
              LOGIN / REGISTER
              <Text className='font-thin'> WITH NUMBER</Text>
            </Text>
          </View>
          <View className='mb-5'>
            <CustomInput
              control={control}
              rules={{
                required: 'Mobile is required',
              }}
              errors={errors}
              customClassName='border border-primary rounded-full'
              name='mobile'
              autoFocus={true}
              placeholder='Enter your mobile number'
              keyboardType='number-pad'
              textContentType='telephoneNumber'
            />
          </View>

          <View className='mb-5'>
            <SubmitButton
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              buttonText='Next'
              customClassName='p-4 bg-primary rounded-full'
              textClassName='text-gray-100 font-bold text-center text-lg'
            />
          </View>
        </View>
      </View>
    </Layout>
  )
}

export default LoginScreen
