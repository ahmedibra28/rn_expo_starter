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
  disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  buttonText,
  customClassName = 'p-4 bg-primary rounded-full',
  textClassName = 'text-gray-100 font-bold text-center text-lg',
  disabled = false,
  ...rest
}: SubmitButtonProps) => {
  return (
    <TouchableOpacity
      {...rest}
      disabled={isLoading || disabled ? true : false}
      className={`${customClassName} ${
        isLoading || disabled ? 'opacity-50' : ''
      }`}
    >
      {isLoading ? (
        <Text className={`uppercase ${textClassName}`}>
          {' '}
          <ActivityIndicator size='small' color='#fff' />
        </Text>
      ) : (
        <Text className={`uppercase ${textClassName}`}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  )
}

export default SubmitButton
