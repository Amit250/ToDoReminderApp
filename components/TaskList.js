import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import database from '@react-native-firebase/database'

import { Feather } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'

export default function TaskList({ taskList }) {
  const updateIcon = async (taskIndex, item) => {
    try {
      if (taskList && taskList.length > 0) {
        const index = taskList.length
        database().ref(`/ToDo/${taskIndex}`).update({
          Category: item.Category,
          List: item.List,
          Completed: !item.Completed,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (taskIndex, name) => {
    Alert.alert('Delete', `You are about to delete ${name}`, [
      {
        text: 'Ok',
        onPress: async () => {
          database().ref(`ToDo/${taskIndex}`).remove()
        },
      },
      { text: 'Cancel', onPress: () => console.log('cancel Pressed') },
    ])
  }

  return (
    <FlatList
      data={taskList}
      renderItem={(items) => {
        if (items.item != null) {
          const taskIndex = items.index
          const taskIcon = items.item.Completed

          return (
            <View className='bg-[#fefffc] my-2 py-4 px-4 rounded-xl flex-row space-x-2 items-center '>
              <Pressable
                onPress={() => {
                  updateIcon(taskIndex, items.item)
                }}
              >
                <Feather
                  name={`${taskIcon ? 'check-circle' : 'circle'}`}
                  size={24}
                  color='#9bc2fb'
                />
              </Pressable>
              <Text className={`${taskIcon && 'line-through'} text-md flex-1`}>
                {items.item.List}
              </Text>
              <TouchableOpacity
                onPress={() => deleteTask(taskIndex, items.item.List)}
              >
                <SimpleLineIcons name='trash' size={24} color='#9bc2fb' />
              </TouchableOpacity>
            </View>
          )
        }
      }}
    />
  )
}
