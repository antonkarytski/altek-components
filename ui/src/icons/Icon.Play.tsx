import React from 'react'
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function PlayIcon({
  color = GRAY.COMMON,
  size = 30,
  style,
}: IconProps) {
  return (
    <FontAwesomeIcon
      icon={faPlay}
      color={color}
      size={size}
      style={style as FontAwesomeIconStyle}
    />
  )
}
