import React, { ReactNode } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useHeaderHeight } from '@react-navigation/elements'
import { Platform } from 'react-native'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const headerHeight = useHeaderHeight()

  return (
    <KeyboardAwareScrollView
      className={`bg-base-200 ${
        headerHeight > 50
          ? `${Platform.OS === 'android' ? '-mt-7' : '-mt-10'}`
          : ''
      } `}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className='bg-base-200'>
          <View
            className={`flex justify-center min-h-[${
              Platform.OS === 'android' ? '100vh' : '95vh'
            }] ${
              headerHeight > 50
                ? `${Platform.OS === 'android' ? '-mt-0' : '-mt-5'}`
                : ''
            }`}
          >
            {children}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

export default Layout
