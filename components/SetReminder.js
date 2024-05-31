import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
} from 'react-native'
import { useState, useEffect } from 'react'

const SetReminder = () => {
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')
  const { AlarmModule, EventModule } = NativeModules

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.EventModule)

    let eventListener = eventEmitter.addListener('EventReminder', (event) => {
      console.log(event.eventProperty) // "someValue"
    })
    // Removes the listener once unmounted
    return () => {
      eventListener.remove()
    }
  }, [])

  const handlePress = () => {
    AlarmModule.createAlarmEvent(time, message)
    setMessage('')
    setTime('')
  }
  return (
    <View className='flex-1 items-center justify-center space-y-3 w-full'>
      {/* input fields  */}
      <TextInput
        className=' border border-gray-500 rounded-full px-3 py-1 w-[300px]'
        placeholder=' Time in seconds'
        value={time}
        onChangeText={(value) => setTime(value)}
        keyboardType='numeric'
      />

      <TextInput
        className=' border border-gray-500 rounded-full px-3 py-1 w-[300px]'
        placeholder=' message'
        value={message}
        onChangeText={(value) => setMessage(value)}
      />

      <TouchableOpacity
        onPress={handlePress}
        className='bg-slate-600 rounded-full py-2 px-4'
      >
        <Text className='text-[#61dafb] '>Schedule</Text>
      </TouchableOpacity>
      <Text>Create new item here</Text>
    </View>
  )
}

export default SetReminder
