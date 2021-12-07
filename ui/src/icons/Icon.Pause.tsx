import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function PauseIcon({
  color = GRAY.COMMON,
  size = 30,
}: IconProps) {
  return <FontAwesomeIcon icon={faPause} color={color} size={size} />
}
