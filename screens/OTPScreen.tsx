import { Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import { SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../components/SubmitButton'
import { NavigationProps } from '../navigation/StackNavigation'
import apiHook from '../utils'
import useUserInfoStore from '../zustand/userStore'
import { useIsFocused } from '@react-navigation/native'
import FlashMessage, { showMessage } from 'react-native-flash-message'

interface FormData {}

const OTPScreen = ({ navigation }: NavigationProps) => {
  const input1Ref = useRef<TextInput>(null)
  const input2Ref = useRef<TextInput>(null)
  const input3Ref = useRef<TextInput>(null)
  const input4Ref = useRef<TextInput>(null)

  const [inputValues, setInputValues] = useState(['', '', '', ''])

  const handleInputChange = (text: string, inputIndex: number) => {
    const inputs = [input1Ref, input2Ref, input3Ref, input4Ref]
    const newInputValues = [...inputValues]
    newInputValues[inputIndex] = text
    setInputValues(newInputValues)

    if (text.length > 0 && inputIndex < inputs.length) {
      inputs[inputIndex].current?.setNativeProps({ text })

      const nextInput = inputs[inputIndex + 1]
      if (nextInput) {
        nextInput.current?.focus()
      }
    }

    if (text.length === 0 && inputIndex > 0) {
      inputs[inputIndex - 1].current?.focus()
    }

    if (text.length === 4) {
      inputs[inputs.length - 1].current?.blur()
    }
  }

  const handleInputBackspace = (text: string, inputIndex: number) => {
    const inputs = [input1Ref, input2Ref, input3Ref, input4Ref]

    if (text.length === 0 && inputIndex > 0) {
      inputs[inputIndex - 1].current?.focus()
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
  })

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

  // const login = apiHook({
  //   key: ['login'],
  //   method: 'POST',
  //   url: 'auth/login',
  // })?.post

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const otp = inputValues.join('')

    if (otp?.length) {
      navigation.navigate('HomeBottomTabs')
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
  }

  const isLoading = false

  return (
    <Layout>
      <FlashMessage position='top' />

      <View className='mx-4'>
        <View className='mb-10'>
          <Text className='text-white text-5xl font-bold'>
            OTP
            <Text className='font-thin'> VERIFICATION</Text>
          </Text>
        </View>

        <View className='mb-5'>
          <Text className='text-white text-lg'>
            Please enter 4-digit code sent to your mobile number
          </Text>
        </View>

        <View className='flex-row flex-wrap justify-between mb-10'>
          <TextInput
            ref={input1Ref}
            autoFocus={true}
            maxLength={1}
            keyboardType='numeric'
            onChangeText={(text) => handleInputChange(text, 0)}
            className='border border-base-100 p-4 my-2 text-white w-16 h-16 text-center'
            onKeyPress={({ nativeEvent: { key } }) => {
              if (key === 'Backspace') {
                handleInputBackspace('', 0)
              }
            }}
          />
          <TextInput
            ref={input2Ref}
            maxLength={1}
            keyboardType='numeric'
            onChangeText={(text) => handleInputChange(text, 1)}
            className='border border-base-100 p-4 my-2 text-white w-16 h-16 text-center'
            onKeyPress={({ nativeEvent: { key } }) => {
              if (key === 'Backspace') {
                handleInputBackspace('', 1)
              }
            }}
          />
          <TextInput
            ref={input3Ref}
            maxLength={1}
            keyboardType='numeric'
            onChangeText={(text) => handleInputChange(text, 2)}
            className='border border-base-100 p-4 my-2 text-white w-16 h-16 text-center'
            onKeyPress={({ nativeEvent: { key } }) => {
              if (key === 'Backspace') {
                handleInputBackspace('', 2)
              }
            }}
          />
          <TextInput
            ref={input4Ref}
            maxLength={1}
            keyboardType='numeric'
            onChangeText={(text) => handleInputChange(text, 3)}
            className='border border-base-100 p-4 my-2 text-white w-16 h-16 text-center'
            onKeyPress={({ nativeEvent: { key } }) => {
              if (key === 'Backspace') {
                handleInputBackspace('', 3)
              }
            }}
          />
        </View>

        <View className='mb-5'>
          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={inputValues.some((value) => value === '')}
            buttonText='Verify'
            customClassName='p-4 bg-base-100 rounded-full'
            textClassName='text-gray-100 font-bold text-center text-lg'
          />
        </View>
      </View>
    </Layout>
  )
}

export default OTPScreen
