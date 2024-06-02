import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  NativeModules,
  NativeEventEmitter,
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database'

import { MaterialIcons } from '@expo/vector-icons'
import categories from '../../assets/categories'
import TaskList from '../../components/TaskList'

const HomeScreen = ({ navigation }) => {
  const { height } = useWindowDimensions()
  const [category, SetCategory] = useState('All')
  const [taskList, setTaskList] = useState([])
  const { AlarmModule } = NativeModules

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.EventModule)

    let eventListener = eventEmitter.addListener('EventReminder', (event) => {
      console.log(event.eventProperty)
      AlarmModule.showNotificationEvent(event.eventProperty)
    })

    // Removes the listener once unmounted
    return () => {
      eventListener.remove()
    }
  }, [])

  const fetchTasks = async () => {
    try {
      database()
        .ref('ToDo')
        .once('value')
        .then((data) => {
          if (category == 'All') {
            setTaskList(data.val())
          } else {
            setTaskList(data.val().filter((item) => item.Category == category))
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [category, taskList])

  return (
    <View className='flex-1 items-center justify-start px-5 py-3  bg-[#f6f8fd] '>
      {/* Header  */}
      <View
        className='bg-[#9bc2fb] w-full py-3 rounded-lg mx-3  '
        style={styles.shadow}
      >
        <Text className='text-white font-semibold text-center text-lg'>
          ToDo List
        </Text>
      </View>

      {/* categories  */}
      <View style={{ height: height * 0.2, marginTop: 20 }}>
        <Text className='font-semibold ' style={{ alignSelf: 'flex-start' }}>
          Categories
        </Text>

        <FlatList
          data={categories}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => SetCategory(item.name)}>
                <View
                  className={` border m-4 py-4 px-3 rounded-2xl  items-center justify-center bg-[#fefffc]
                  ${
                    item.name == category
                      ? 'border-[#9bc2fb]'
                      : 'border-gray-200'
                  }`}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={25}
                    color={item.color}
                  />
                </View>
                <Text className=' text-center text-xs'>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* List of Tasks  */}
      <View className='flex-1 justify-start my-4 w-full '>
        <Text
          style={{ alignSelf: 'flex-start' }}
          className=' mb-4 font-semibold'
        >
          List of Tasks
        </Text>
        {taskList?.length > 0 ? (
          <TaskList taskList={taskList} />
        ) : (
          <View
            className='items-center justify-center'
            style={{ marginTop: height * 0.2 }}
          >
            <Text className=' text-md text-gray-400'>There are no Tasks</Text>
          </View>
        )}
      </View>

      <View
        className='bg-[#9bc2fb] items-center justify-center rounded-full px-4 py-1'
        style={styles.shadow}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateItem', {
              taskList: taskList,
            })
          }
        >
          <Text className='text-4xl font-light text-white'>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
})
