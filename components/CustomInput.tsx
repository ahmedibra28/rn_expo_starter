import React from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Platform, Text, TextInput } from 'react-native'

interface CustomInputProps {
  textContentType:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password'

  placeholder: string
  name: string
  control: Control<any>
  customClassName?: string
  autoFocus?: boolean
  secureTextEntry?: boolean
  rules?: Record<string, unknown>
  editable?: boolean
  errors?: FieldErrors<any>
  multiline?: boolean
  numberOfLines?: number
}

const CustomInput = ({
  textContentType,
  keyboardType = 'default',
  placeholder,
  name,
  control,
  customClassName = 'border border-primary text-white rounded-full',
  autoFocus = false,
  secureTextEntry = false,
  rules = {},
  editable = true,
  multiline = false,
  numberOfLines = 1,
  ...rest
}: CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            {...rest}
            multiline={multiline}
            numberOfLines={numberOfLines}
            value={value}
            autoFocus={autoFocus}
            onChangeText={onChange}
            onBlur={onBlur}
            className={`${
              Platform.OS === 'android' ? 'p-2.5' : 'p-4'
            } ${customClassName} ${error ? 'border border-red-500' : ''} `}
            placeholder={placeholder}
            keyboardType={keyboardType}
            textContentType={textContentType}
            secureTextEntry={secureTextEntry}
            editable={editable}
          />
          {error && (
            <Text className='text-red-500 text-xs text-center'>
              {error?.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  )
}
export default CustomInput
