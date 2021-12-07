import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BLUE } from '../colors'
import { IconProps } from './_types'
import Text from '../text'

type CircleIconProps = {
  value: string | number
  borderColor?: string
} & IconProps

export default function CircleIcon({
  value,
  size = 20,
  style,
  color = BLUE.COMMON,
  borderColor = BLUE.BODY,
}: CircleIconProps) {
  const dStyles = {
    width: size,
    height: size,
    backgroundColor: color,
    borderColor,
  }

  return (
    <View style={[styles.container, dStyles, style]}>
      <Text medium style={styles.circleTitle}>
        {value}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleTitle: {
    fontSize: 10,
    marginBottom: 1.5,
    color: '#fff',
    textAlign: 'center',
  },
})
