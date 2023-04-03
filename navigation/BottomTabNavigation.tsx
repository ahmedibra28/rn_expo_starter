import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import ContactScreen from '../screens/ContactScreen'
import FeedbackScreen from '../screens/FeedbackScreen'
import ProfileScreen from '../screens/ProfileScreen'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/native'

type RootTabParamList = {
  Home: undefined
  Contact: undefined
  Feedback: undefined
  Profile: undefined
}

type HomeScreenRouteProp = RouteProp<RootTabParamList, 'Home'>
type ContactScreenRouteProp = RouteProp<RootTabParamList, 'Contact'>
type FeedbackScreenRouteProp = RouteProp<RootTabParamList, 'Feedback'>
type ProfileScreenRouteProp = RouteProp<RootTabParamList, 'Profile'>

export type NavigationProps = {
  navigation: BottomTabNavigationProp<RootTabParamList>
  route:
    | HomeScreenRouteProp
    | ContactScreenRouteProp
    | FeedbackScreenRouteProp
    | ProfileScreenRouteProp
}

const Tab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='home' size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='Contact'
        component={ContactScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='contact-phone' size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='Feedback'
        component={FeedbackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='feedback' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='person' size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
