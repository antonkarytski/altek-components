import React, { PropsWithChildren } from 'react'
import { InsideMultiSelectInput } from './InsideMultiSelectInput'
import { SpecifiedMultiSelectInputProps } from '../types'
import { StyleSheet, View } from 'react-native'

export const UnderMultiSelectInput = ({
  children,
  style,
  ...props
}: PropsWithChildren<SpecifiedMultiSelectInputProps>) => {
  return (
    <>
      <InsideMultiSelectInput
        style={[styles.inputContainUnder, style]}
        {...props}
      />
      <View style={styles.containUnderWrap}>{children}</View>
    </>
  )
}

export default UnderMultiSelectInput

const styles = StyleSheet.create({
  containUnderWrap: {
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputContainUnder: {
    height: 34,
  },
})
