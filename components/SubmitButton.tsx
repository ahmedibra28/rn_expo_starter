import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Text,
} from 'react-native'

interface SubmitButtonProps extends TouchableOpacityProps {
  isLoading: boolean
  buttonText: string
  customClassName?: string
  textClassName?: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  buttonText,
  customClassName = 'bg-orange-50 border-orange-500 border rounded-full',
  textClassName = 'text-gray-100 font-bold text-center',
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      disabled={isLoading}
      className={`p-2.5 ${customClassName}`}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color='#fff' />
      ) : (
        <Text className={`uppercase ${textClassName}`}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  )
}

export default SubmitButton
