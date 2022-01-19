import React from 'react'
import { TouchableOpacity } from 'react-native'
import LeftArrowIcon, { LeftArrowProps } from '../icons/Icon.LeftArrow'
import { Fn } from 'altek-toolkit'

type BackButtonProps = {
  onPress: Fn
} & LeftArrowProps

export default function BackButton({
  onPress,
  style,
  color = '#FFF',
  size = 25,
  driver = 'arrow',
}: BackButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle.container, style]}>
      <LeftArrowIcon driver={driver} size={size} color={color} />
    </TouchableOpacity>
  )
}

const buttonStyle = {
  container: { top: 20, paddingLeft: 20 },
}
