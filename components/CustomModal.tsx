import { View, Modal, ScrollView } from 'react-native'
import React from 'react'
import SubmitButton from './SubmitButton'

const CustomModal = ({
  modalVisible,
  setModalVisible,
  data,
  height = 'h-2/3',
}: {
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  data: () => React.ReactNode
  height?: string
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View className='flex-1 justify-end items-center mt-16'>
        <View
          className={`bg-white p-4 rounded-tr-3xl rounded-tl-3xl w-full ${height}`}
        >
          <ScrollView>{data()}</ScrollView>

          <View className='mb-5 flex-1 justify-end'>
            <SubmitButton
              onPress={() => setModalVisible(!modalVisible)}
              isLoading={false}
              buttonText='Close'
              customClassName='p-4 bg-base-100 rounded-full'
              textClassName='text-gray-100 font-bold text-center text-lg'
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal
