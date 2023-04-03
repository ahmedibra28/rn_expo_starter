import * as React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack'
import SettingScreen from '../screens/SettingScreen'
import BottomTabNavigator from './BottomTabNavigation'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

type RootStackParamList = {
  Login: undefined
  Register: undefined
  Setting: undefined
  HomeBottomTabs: undefined
}

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>
type SettingScreenRouteProp = RouteProp<RootStackParamList, 'Setting'>
type HomeBottomTabsScreenRouteProp = RouteProp<
  RootStackParamList,
  'HomeBottomTabs'
>

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>
  route:
    | LoginScreenRouteProp
    | RegisterScreenRouteProp
    | SettingScreenRouteProp
    | HomeBottomTabsScreenRouteProp
}

const Stack = createStackNavigator<RootStackParamList>()

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Setting' component={SettingScreen} />
        <Stack.Screen
          name='HomeBottomTabs'
          component={BottomTabNavigator}
          options={{
            headerShown: false,
            title: 'Home',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation
