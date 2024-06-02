import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  NativeModules,
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker'
import database from '@react-native-firebase/database'
import { useRoute } from '@react-navigation/native'
import { Fontisto } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

export default function CreateItemScreen({ navigation }) {
  const route = useRoute()
  const { taskList } = route.params

  const { height, width } = useWindowDimensions()
  const [task, setTask] = useState('')
  const [selected, setSelected] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [dateSelected, setDateSelected] = useState(false)
  const [timeSelected, setTimeSelected] = useState(false)

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [reminderText, setReminderText] = useState('Set Reminder')

  const { AlarmModule } = NativeModules

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setDate(selectedDate)
    setShow(false)

    let tempDate = new Date(currentDate)
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear()
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes()
    setReminderText(fDate + '   ' + fTime)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const data = [
    { key: '1', value: 'Work' },
    { key: '2', value: 'Personal' },
    { key: '3', value: 'Shopping' },
    { key: '4', value: 'Health' },
    { key: '5', value: 'Study' },
  ]

  const createTask = async () => {
    const index = taskList ? taskList.length : 0
    database()
      .ref(`/ToDo/${index}`)
      .set({
        Category: data[selected - 1].value,
        List: task,
        Completed: false,
      })

    AlarmModule.createAlarmEvent(
      Math.ceil((date.getTime() - Date.now()) / 1000).toString(),
      task
    )
    navigation.goBack()
  }
  return (
    <View className='flex-1  justify-start px-4 py-8 bg-[#f6f8fd] '>
      <View className='flex-row items-start'>
        <Ionicons
          name='arrow-back-circle-outline'
          size={24}
          color='black'
          style={{ alignSelf: 'flex-start' }}
          onPress={() => navigation.goBack()}
        />
        <Text className='font-semibold text-center flex-1 mr-3'>New Task</Text>
      </View>

      <TextInput
        placeholder='Enter Task Name'
        className={`${
          task.length > 0 ? 'border-[#9bc2fb]' : ' border-gray-300'
        } mt-20  mx-4 py-2 border-b `}
        value={task}
        onChangeText={(value) => setTask(value)}
      />

      <View className='flex-row items-center pt-8 px-4'>
        <Feather
          name='bell'
          size={18}
          color={`${reminderText !== 'Set Reminder' ? '#9bc2fb' : '#a0aec0'}`}
        />
        <TouchableOpacity
          className='px-3'
          onPress={() => {
            setOpenModal(true)
          }}
        >
          <Text
            className={`${
              reminderText === 'Set Reminder'
                ? 'text-gray-400'
                : 'text-[#9bc2fb]'
            } text-light`}
          >
            {reminderText}
          </Text>
        </TouchableOpacity>
      </View>

      {openModal && (
        <Modal transparent={true}>
          <View
            className='  bg-white rounded-2xl border border-gray-100 px-4 py-3'
            style={{
              marginTop: height * 0.35,
              marginHorizontal: width * 0.08,
              height: height * 0.3,
            }}
          >
            <View className='flex-row'>
              <Text className='text-[#5886fe] font-semibold flex-1'>
                Select Date and Time
              </Text>
              <Pressable onPress={() => setOpenModal(false)}>
                <Entypo name='circle-with-cross' size={20} color='black' />
              </Pressable>
            </View>

            <View className='mt-7 px-2 flex-row items-center'>
              <Fontisto
                name='date'
                size={20}
                color={`${
                  dateSelected && date.getTime() > Date.now()
                    ? '#9bc2fb'
                    : '#a0aec0'
                }`}
              />
              <Pressable
                className='ml-3'
                onPress={() => {
                  showMode('date')
                  setDateSelected(true)
                }}
              >
                <Text
                  className={`${
                    dateSelected && date.getTime() > Date.now()
                      ? 'text-[#9bc2fb]'
                      : ' text-[#a0aec0]'
                  }`}
                >
                  Date
                </Text>
              </Pressable>
            </View>

            <View className='mt-4 px-2 flex-row items-center'>
              <Ionicons
                name='alarm-outline'
                size={22}
                color={`${
                  dateSelected && date.getTime() > Date.now()
                    ? '#9bc2fb'
                    : '#a0aec0'
                }`}
              />
              <Pressable
                className='ml-3'
                onPress={() => {
                  showMode('time')
                  setTimeSelected(true)
                }}
              >
                <Text
                  className={`${
                    dateSelected && date.getTime() > Date.now()
                      ? 'text-[#9bc2fb]'
                      : ' text-[#a0aec0]'
                  }`}
                >
                  Time
                </Text>
              </Pressable>
            </View>

            <Text className='text-red-500 px-4 text-center pt-4'>
              {dateSelected && timeSelected && date.getTime() < Date.now()
                ? 'Select future date and time'
                : null}
            </Text>

            {dateSelected && timeSelected && date.getTime() > Date.now() ? (
              <TouchableOpacity
                className={`flex items-end justify-end pt-4 px-3 `}
                onPress={() => {
                  setOpenModal(false)
                }}
              >
                <Text className='text-[#9bc2fb]'> Save </Text>
              </TouchableOpacity>
            ) : (
              <Text
                className='flex items-end pt-4 px-3 text-gray-300'
                style={{ alignSelf: 'flex-end' }}
              >
                Save
              </Text>
            )}
          </View>
        </Modal>
      )}

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}

      <View className='flex-row item-center pt-4 px-4'>
        <SelectList
          setSelected={setSelected}
          data={data}
          boxStyles={{
            borderColor: `${selected != 0 ? '#9bc2fb' : '#a0aec0'}`,
          }}
          search={false}
          defaultOption={{ key: '0', value: 'Category' }}
        />
      </View>

      {selected != 0 && task.length > 0 ? (
        <TouchableOpacity
          className=' items-center mt-10 bg-[#9bc2fb] px-10 py-3 rounded-lg mx-3  '
          onPress={createTask}
        >
          <Text className='text-white font-semibold text-center '>
            Create Task
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
