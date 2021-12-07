import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { IconProps } from './_types'

export default function CheckIcon({ color, size }: IconProps) {
  return <FontAwesomeIcon icon={faCheck} color={color} size={size} />
}
