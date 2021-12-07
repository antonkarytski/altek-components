import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { COMMON } from '../colors'

export default function LocationFilledIcon({
  size = 16,
  color = COMMON.WHITE,
}: IconProps) {
  return (
    <Svg width={size} height={size * 1.375} viewBox="0 0 16 22" fill="none">
      <Path
        d="M8 0C3.955 0 .665 3.29.665 7.333c0 1.214.304 2.418.88 3.485l6.052 10.946a.458.458 0 00.802 0l6.054-10.95a7.347 7.347 0 00.879-3.48C15.333 3.29 12.043 0 7.999 0zm0 11a3.67 3.67 0 01-3.667-3.667 3.67 3.67 0 013.666-3.666 3.67 3.67 0 013.667 3.666A3.67 3.67 0 017.999 11z"
        fill={color}
      />
    </Svg>
  )
}
