import { useHeaderHeight } from '@react-navigation/elements'
import React, { ReactNode } from 'react'
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  PixelRatio,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const screenHeight = Dimensions.get('screen').height
  const headerHeight = useHeaderHeight()


  const availableHeight = screenHeight - headerHeight

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View
            className={`flex justify-center`}
            style={{ height: availableHeight }}
          >
            {children}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
