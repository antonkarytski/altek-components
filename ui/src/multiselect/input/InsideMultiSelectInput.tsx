import React, { PropsWithChildren } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../../text'
import { SpecifiedMultiSelectInputProps } from '../types'

export const InsideMultiSelectInput = ({
  children,
  withShadow,
  onPress,
  style,
  textStyle,
  placeholder,
}: PropsWithChildren<SpecifiedMultiSelectInputProps>) => {
  return (
    <TouchableOpacity
      style={[styles.input, withShadow ? styles.inputShadow : null, style]}
      onPress={onPress}
      activeOpacity={1}
    >
      {children || (
        <Text style={[styles.placeholder, textStyle]}>{placeholder || ''}</Text>
      )}
    </TouchableOpacity>
  )
}

export default InsideMultiSelectInput

const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    paddingLeft: 9,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholder: {
    lineHeight: 16,
  },
})
