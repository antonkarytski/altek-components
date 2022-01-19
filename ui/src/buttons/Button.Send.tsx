import React from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'
import { SendIcon } from '../icons'
import { IconProps } from '../icons/_types'
import { sendButtonStyles } from './styles'
import { Fn } from 'altek-toolkit'

type SendButtonProps = {
  onPress: Fn
  style?: StyleProp<ViewStyle>
} & IconProps

export default function SendButton({
  onPress,
  style,
  color,
  size,
}: SendButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      delayPressIn={0}
      delayPressOut={0}
    >
      <View style={sendButtonStyles.sendWrapper}>
        <SendIcon color={color} size={size} />
      </View>
    </TouchableOpacity>
  )
}
