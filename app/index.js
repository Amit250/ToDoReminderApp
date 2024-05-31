import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import CreateItemScreen from './screens/CreateItemScreen'

const Stack = createNativeStackNavigator()

export default function index() {
  const [index, setIndex] = useState(1)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='CreateItem' component={CreateItemScreen} />
    </Stack.Navigator>
  )
}
